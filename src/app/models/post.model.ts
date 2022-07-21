
export class PostModel {
    constructor(
        public body: string = '',
        public title: string = '',
        public userId: number = 1,
        public id?: number) {
    }
}
