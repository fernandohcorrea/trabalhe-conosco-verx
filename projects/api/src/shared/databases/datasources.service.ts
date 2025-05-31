import { Injectable } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class DataSourcesService {
  private config: any;

  constructor(private configService: ConfigService) {
    this.config = this.configService.get('databases');
  }

  public getDataSourceConfig(connection_name = null): DataSourceOptions {
    let conn_name = this.config[`db_default`] || `db_default`;
    if (connection_name) {
      conn_name = connection_name;
    }

    if (!this.config[conn_name]) {
      throw new Error(`Connection ${conn_name} not found`);
    }

    return this.config[conn_name];
  }
}
