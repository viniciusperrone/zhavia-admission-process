import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { ElasticsearchConnection } from '@shared/infra/elasticsearch';

interface IRequest {
  query: string;
}

@Injectable()
class SearchArticleService {
  constructor(
    @Inject('ElasticsearchConnection')
    private elasticsearchConnection: ElasticsearchConnection,
  ) {}

  public async execute({ query }: IRequest): Promise<any[]> {
    const results = await this.elasticsearchConnection.search(
      'articles',
      query,
    );

    return results;
  }
}

export default SearchArticleService;
