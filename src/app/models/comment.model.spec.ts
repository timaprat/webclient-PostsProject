import { CommentModel } from './comment.model';

const settedConstructDatas = {
  postId: 1,
  name: "_name",
  email: "_email",
  body: "_body",
  id: 1,
};

const _settedModel: CommentModel = new CommentModel(
  settedConstructDatas.postId,
  settedConstructDatas.name,
  settedConstructDatas.email,
  settedConstructDatas.body,
  settedConstructDatas.id
);


describe('Comment', () => {
  it('should create an instance', () => {
    expect(new CommentModel()).toBeTruthy();
  });
});
