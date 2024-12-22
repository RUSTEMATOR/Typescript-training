interface IAcademicPerformance {
    totalCredits: string,
    gpa: string
}

interface IPersonInfo {
    firstName: string, 
    lastName: string, 
    birthDay: string, 
    gender: Gender
    other: string
}

interface IContactInfo {
    email: string,
    phone: string
}

type FullPersonInfo = IContactInfo & IPersonInfo

type Gender = "male" | "female"

type Role = "student" | "teacher"


const Jim: FullPersonInfo = { 
    firstName: "John",
    lastName: "Doe",
    birthDay: "12.03.1999",
    gender: "male",
    other: "Student",
    email: "johndoe@university.com",
    phone: "+380955555555"
} 

const defaultContact: IContactInfo = {
    email: "info@university.com",
    phone: "+380955555555",
};

class UniversityError extends Error {
    name: string

    constructor(message: string) {
    super(message);
    this.name = "UniversityError";
    }
}

class University {
    name: string;
    courses: Array<Course> = []
    groups: Array<Group> = [];
    people: Array<Person> = [];

    constructor(name: string) {
    this.name = name;
}

addCourse(course: Course): void {
    this.courses.push(course);
}

addGroup(group: Group): void {
    this.groups.push(group);
}

addPerson(person: Person): void {
    this.people.push(person);
}

findGroupByCourse(course: Course): Group | undefined {
    return this.groups.find((group) => group.course === course);
}

getAllPeopleByRole(role: Role): Array<Person> | void {
    switch (role) {
    case "student":
    return this.people.filter((person) => person.role === "student");
    case "teacher":
    return this.people.filter((person) => person.role === "teacher");
    default:
    return this.assertNeverRole(role);
    }
}

assertNeverRole(role: string): void {
    throw new Error(`Unhandled role: ${role}`);
    }
}

class Course {
    name: string;
    credits: number;
    discipline: string;

    constructor(name: string, credits: number, discipline: string) {
    this.name = name;
    this.credits = credits;
    this.discipline = discipline;
    }
}

class Group {
    name: string;
    course: Course;
    teacher: Teacher;
    students: Array<Student> = [];

    constructor(name: string, course: Course, teacher: Teacher) {
        this.name = name;
        this.course = course;
        this.teacher = teacher;
    }

    addStudent(student: Student): void {
        if (this.students.includes(student)) {
        throw new UniversityError("Student is already in the group");
    }

        this.students.push(student);
    }

    removeStudentById(id: number): void {
        const index = this.students.findIndex((student) => student.id === id);

        if (!~index) {
        throw new UniversityError("Student not found in group");
    }

        this.students.splice(index, 1);
    }

    getAverageGroupScore() {
        if (this.students.length) {
        return 0;
    }

        const totalScore = this.students.reduce(
        (sum, student) => sum + student.getAverageScore(),
        0
        );

        return totalScore / this.students.length;
    }

    getStudents() {
        return [...this.students];
    }

    getStudentById() {
    // Add the ability to pass a single identifier and an array of identifiers
    }
}

class Person {
    static nextId = 1;

    firstName: string;
    lastName: string;
    birthDay: string;
    id: number;
    gender: Gender;
    contactInfo: IContactInfo;
    role: Role;

    constructor(info: FullPersonInfo, role: Role) {
    const { firstName, lastName, birthDay, gender, email, phone }: FullPersonInfo = info;

    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDay = birthDay;
    this.id = Person.nextId;
    this.gender = gender;
    this.contactInfo = { email, phone };
    this.role = role;
}

get fullName() {
    return `${this.lastName} ${this.firstName}`;
}

get age() {
    const today = new Date();
    let age = today.getFullYear() - this.birthDay.getFullYear();
    const monthDiff = today.getMonth() - this.birthDay.getMonth();

    if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < this.birthDay.getDate())
    ) {
    age--;
    }

    return age;
    }
}

class Teacher extends Person {
    specializations = [];
    courses = [];

    constructor(info, specializations = []) {
    super(info, "teacher");
    this.specializations = specializations;
    }

    assignCourse(course) {
    this.courses.push(course);
    }

    removeCourse(courseName) {
    this.courses = this.courses.filter((course) => course.name !== courseName);
    }

    getCourses() {
    return [...this.courses];
    }
}

class Student extends Person {
    academicPerformance = {
    totalCredits: 0,
    gpa: 0,
    };
    enrolledCourses = [];
    status;

    constructor(info) {
    super(info, "student");
    this.status = "active";
    }

    enrollCourse(course) {
    if (this.status !== "active") {
    throw new UniversityError(
    "Cannot enroll: Student is not in active status"
    );
    }

    this.enrolledCourses.push(course);
    this.academicPerformance.totalCredits += course.credits;
    }

    getAverageScore() {
    return this.academicPerformance.gpa;
    }

    updateAcademicStatus(newStatus) {
    this.status = newStatus;
    }

    getEnrolledCourses() {
    return [...this.enrolledCourses];
    }
}
