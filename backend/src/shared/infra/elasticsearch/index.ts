import { Client } from '@elastic/elasticsearch';

import dotenv from 'dotenv';

dotenv.config();

class ElasticsearchConnection {
  private client: Client;

  constructor() {
    this.client = new Client({ node: process.env.SERVER_HOST_ELASTICSEARCH });
  }

  public async createIndex(
    index: string,
    mappings: object,
  ): Promise<any | void> {
    try {
      const result = await this.client.indices.create(
        {
          index,
          body: { mappings },
        },
        { ignore: [400] },
      );

      console.log(`Index ${index} created or already exists`);
      return result;
    } catch (error) {
      console.error(`Error creating index ${index}:`, error);
    }
  }

  public async indexDocument(
    index: string,
    document: object,
  ): Promise<any | void> {
    try {
      const result = await this.client.index({
        index,
        body: document,
      });
      console.log('Document indexed successfully');

      return result;
    } catch (error) {
      console.error('Error indexing document:', error);
    }
  }

  public async updateDocument(
    index: string,
    id: string,
    document: object,
  ): Promise<void> {
    try {
      await this.client.update({
        id,
        index,
        body: document,
      });
    } catch (error) {
      console.error('Error indexing document:', error);
    }
  }

  public async removeDocument(index: string, id: string): Promise<void> {
    try {
      await this.client.delete({
        id,
        index,
      });
    } catch (error) {
      console.error('Error indexing document:', error);
    }
  }

  public async search(index: string, query: string): Promise<any> {
    const list = await this.client.search({
      index,
      query: {
        multi_match: {
          query,
          fields: ['title', 'description', 'slug', 'category', 'user.name'],
        },
      },
    });

    return list.hits.hits || [];
  }
}

export { ElasticsearchConnection };
