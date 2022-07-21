export class CommentModel {
    constructor(
        public postId?: number,
        public name: string='',
        public email: string='',
        public body: string='',
        public id?: number) {
    }
}

