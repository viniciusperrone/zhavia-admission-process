import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IArticleRepository } from '../domain/repositories/IArticleRepository';
import { ICreateArticle } from '../domain/models/ICreateArticle';
import { IArticle } from '../domain/models/IArticle';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

type IRequest = Omit<ICreateArticle, 'user'> & {
  user_id: string;
};

@Injectable()
class CreateArticleService {
  constructor(
    @Inject('ArticleRepository')
    private articleRepository: IArticleRepository,

    @Inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    title,
    description,
    slug,
    category,
  }: IRequest): Promise<IArticle> {
    const userExist = await this.userRepository.findById(user_id);

    if (!userExist) {
      throw new AppError('Could not find any user with the given id.');
    }

    const article = this.articleRepository.create({
      user: userExist,
      title,
      description,
      slug,
      category,
    });

    return article;
  }
}

export default CreateArticleService;
