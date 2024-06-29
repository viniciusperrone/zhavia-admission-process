import { Client } from '@elastic/elasticsearch';

import dotenv from 'dotenv';

dotenv.config();

class ElasticsearchConnection {
  private client: Client;

  constructor() {
    this.client = new Client({ node: process.env.SERVER_HOST_ELASTICSEARCH });
  }

  public async createIndex(index: string, mappings: object): Promise<void> {
    try {
      await this.client.indices.create(
        {
          index,
          body: { mappings },
        },
        { ignore: [400] },
      );
      console.log(`Index ${index} created or already exists`);
    } catch (error) {
      console.error(`Error creating index ${index}:`, error);
    }
  }

  public async indexDocument(index: string, document: object): Promise<void> {
    try {
      await this.client.index({
        index,
        body: document,
      });
      console.log('Document indexed successfully');
    } catch (error) {
      console.error('Error indexing document:', error);
    }
  }

  public async search(index: string, query: object): Promise<any[]> {
    try {
      // @ts-ignore
      const { body } = await this.client.search({
        index,
        body: { query },
      });
      return body.hits.hits;
    } catch (error) {
      console.error('Error searching documents:', error);
      return [];
    }
  }
}

export { ElasticsearchConnection };
