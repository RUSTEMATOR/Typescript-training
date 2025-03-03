import {expect, describe, test, beforeEach} from '@jest/globals';
import AnimeService, { IAuthor } from "./homeWork4.1";
import { ANIME_LIST } from "../src/testData/animeServiceData/expectedAnimeList";
import { IDS, NEGATIVE_IDS } from '../src/testData/parametrizedData/animeIds';
import { AUTHOR_NAMES } from '../src/testData/parametrizedData/authorNames';
import { ANIME_AUTHORS } from '../src/testData/animeServiceData/expectedAuthors';



describe('Anime Service test', () => {
    let animeService: AnimeService;
   
    


    beforeEach(() => {
        animeService = new AnimeService();
    })

    test('Get all anime in the list', () => {
        const animes = animeService.getAnime();

        expect(animes).toEqual(ANIME_LIST);       
    })

    for (let id of IDS){
        test('Get anime by id', () => {
            const anime = animeService.getAnimeById(id);
            const expectedAnime = ANIME_LIST.find(anime => anime.id == id)

            expect(anime).toEqual(ANIME_LIST.find(anime => anime.id == id));
        })
    }

    for (let id of NEGATIVE_IDS){
        test('Get anime by id (negative test)', () => {
            const anime = animeService.getAnimeById(id);
            expect(anime).toBeUndefined();
        })
    }

    for (let name of AUTHOR_NAMES) {
        test(`Get anime by author ${name}`, () => {
            const anime = animeService.getAnimesByAuthor(name);
            const expectedAnime = ANIME_LIST.find(a => a.author === name)

            expect(anime).toEqual(expectedAnime) 
        });
    }

    test('Get authors', () => {
        const authors = animeService.getAuthors();
        expect(authors).toEqual(AUTHOR_NAMES);
    })

    for (let id of IDS){
        test('Get author by id', () => {
            const author = animeService.getAuthorById(id);
            const expectedAuthor = ANIME_AUTHORS.find(author => author.id === id)?.name

            expect(author).toEqual(expectedAuthor);
        })
    }

    for (let anime of ANIME_LIST){
        test(`Get author by anime id ${anime.id}`, () => {
            const author = animeService.getAuthorByAnimeId(anime.id);
            const expectedAuthor = ANIME_AUTHORS.find(author => author.id === anime.id)?.name

            expect(author).toEqual(expectedAuthor);
        })
    }
})