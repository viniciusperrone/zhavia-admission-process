import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddUserIdToArticle1719261989840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'articles',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'articles',
      new TableForeignKey({
        name: 'ArticlesUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['uuid'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('articles', 'ArticlesUser');

    await queryRunner.dropColumn('articles', 'user_id');
  }
}
