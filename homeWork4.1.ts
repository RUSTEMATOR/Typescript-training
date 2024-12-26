interface IAnimeService {
    getAnime(): Array<IAnime>
    getAnimeById(id: number): IAnime | undefined;
    getAuthors(): Array<IAnime["author"]>
    getAuthorById(id: number): IAnime["author"] | undefined;
    getAnimesByAuthor(author: string): IAnime | Array<IAnime> | undefined;
    getAuthorByAnimeId(id: number): IAnime["author"] | undefined
    search(criteria: ISearchCriteria): IAnime
    search(criteria: Array<ISearchCriteria>): Array<IAnime>;
}

interface IAnime {
    id: number
    author: string
    year: string
    genre: string
    title: string
}

interface IAuthor {
    id: number
    name: string
}

interface ISearchCriteria {
    id?: number | undefined;
    author?: string | undefined;
    year?: string | undefined;
    genre?: string | undefined;
    title?: string | undefined;
}


class AnimeService implements IAnimeService {

    private animeList: Array<IAnime> = [
        { id: 1, author: "Masashi Kishimoto", year: "2002", genre: "Shonen", title: "Naruto" },
        { id: 2, author: "Tite Kubo", year: "2004", genre: "Shonen", title: "Bleach" },
        { id: 3, author: "Eiichiro Oda", year: "1999", genre: "Shonen", title: "One Piece" },
    ]

    private autors: Array<IAuthor> = [
        {id: 1, name: "Masashi Kishimoto"},
        {id: 2, name: "Tite Kubo"},
        {id: 3, name: "Eiichiro Oda"}
    ]

    private searchSingle(criteria: ISearchCriteria): IAnime[] {
        const { id, author, year, genre, title } = criteria
        return this.animeList.filter(anime => {
            if (id && anime.id !== id) {
                return false
            }
            if (author && anime.author !== author) {
                return false
            }
            if (year && anime.year !== year) {
                return false
            }
            if (genre && anime.genre !== genre) {
                return false
            }
            if (title && anime.title !== title) {
                return false
            }
            return true
        })
    }

    private multipleSearch(anime: IAnime, criteria: ISearchCriteria): boolean {
        const { id, author, year, genre, title } = criteria
        if (id && anime.id !== id) {
            return false
        }
        if (author && anime.author !== author) {
            return false
        }
        if (year && anime.year !== year) {
            return false
        }
        if (genre && anime.genre !== genre) {
            return false
        }
        if (title && anime.title !== title) {
            return false
        }
        return true
    }

    getAnime(): Array<IAnime> {
        return this.animeList
    }

    getAnimeById(id: number): IAnime | undefined {
        return this.animeList.find(anime => anime.id === id)
    }

    getAnimesByAuthor(author: string): IAnime | Array<IAnime> | undefined {
        return this.animeList.find(anime => anime.author === author)
    }

    getAuthors(): Array<string> {
        return this.animeList.map(anime => anime.author)
    }

    getAuthorById(id: number): string | undefined {
        const anime = this.animeList.find(anime => anime.id === id)
        const author = anime?.author
        return author
    }

    getAuthorByAnimeId(id: number): string | undefined {
        const anime = this.animeList.find(anime => anime.id === id)
        const author = anime?.author
        return author
    }

    search(criteria: ISearchCriteria): IAnime;
    search(criteria: ISearchCriteria[]): Array<IAnime>;

    search(criteria: ISearchCriteria | Array<ISearchCriteria>): IAnime | Array<IAnime> {
        if (Array.isArray(criteria)){
            return this.animeList.filter(anime => {
                return criteria.every(criterion => this.multipleSearch(anime, criterion))
            })
        } else {
            return this.searchSingle(criteria)
        }
    }
    
}

const bookService = new AnimeService()

console.log("Get anime:")
console.log(bookService.getAnime())
console.log()
console.log("Get anime by id:")
console.log(bookService.getAnimeById(1))
console.log()
console.log("Get anime by author:")
console.log(bookService.getAnimesByAuthor("Masashi Kishimoto"))
console.log()
console.log("Get anime author:")
console.log(bookService.getAuthors())
console.log()
console.log("Get author by id:")
console.log(bookService.getAuthorById(1))
console.log()
console.log("Get author by anime id:")
console.log(bookService.getAuthorByAnimeId(1))
console.log()
console.log("Search:")
console.log(bookService.search({ id: 1 }))
console.log()
console.log("Search:")
console.log(bookService.search({ author: "Masashi Kishimoto" }))
console.log()
console.log("Search:")
console.log(bookService.search({ year: "2002" }))
console.log()
console.log("Search:")
console.log(bookService.search({ genre: "Shonen" }))
console.log()
console.log("Search:")
console.log(bookService.search({ title: "Naruto" }))
console.log()
console.log("Search:")
console.log(bookService.search([{ genre: "Shonen" }, { author: "Tite Kubo" }]))
console.log()
console.log("Search:")
console.log(bookService.search([{ year: "1999" }, { id: 3}]))



