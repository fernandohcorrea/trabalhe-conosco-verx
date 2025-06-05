import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plot } from '../../../shared/databases/verx/entities/plot.entity';
import { Repository } from 'typeorm';
import { QueryFilterGetAllDTO } from './dtos/query-filter-get-all.dto';
import { CreatePlotDTO } from './dtos/create-plot.dto';
import { RuralProperty } from 'src/shared/databases/verx/entities/rural-property.entity';
import { HttpCustomException } from 'src/shared/exceptions/http-custom-exception';

@Injectable()
export class PlotService {
  constructor(
    @InjectRepository(Plot)
    private plotRepository: Repository<Plot>,
  ) {}

  async getAll(filter: QueryFilterGetAllDTO): Promise<any> {
    const { rural_property_id } = filter;

    const query = this.plotRepository.createQueryBuilder('plots');

    if (rural_property_id) {
      query.andWhere('plots.rural_property_id = :rural_property_id', {
        rural_property_id,
      });
    }

    return await query.getMany();
  }

  async createData(dataDto: CreatePlotDTO): Promise<any> {
    const plot: Plot = this.plotRepository.create(dataDto);

    const validateHectares = await this.validateHectares(
      plot,
      dataDto.rural_property_id,
    );

    if (!validateHectares.status) {
      throw new HttpCustomException({
        status: HttpStatus.CONFLICT,
        message: validateHectares.message,
      });
    }

    try {
      return await this.plotRepository.save(plot);
    } catch (error) {
      console.error(error);
      throw new HttpCustomException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create Plot!',
      });
    }
  }

  async updateData(
    id: number,
    dataDto: CreatePlotDTO,
  ): Promise<{ success: boolean }> {
    const plot = await this.plotRepository.findOneBy({
      id,
      rural_property_id: dataDto.rural_property_id,
    });

    if (!plot) {
      throw new HttpCustomException({
        status: HttpStatus.NOT_FOUND,
        message: 'Plot not found!',
      });
    }

    plot.name = dataDto.name;
    plot.plot_type = dataDto.plot_type;
    plot.hectares = dataDto.hectares;

    const validateHectares = await this.validateHectares(
      plot,
      dataDto.rural_property_id,
    );

    if (!validateHectares.status) {
      throw new HttpCustomException({
        status: HttpStatus.CONFLICT,
        message: validateHectares.message,
      });
    }

    try {
      const result = await this.plotRepository.update(plot.id, plot);

      if (result.affected === 0) {
        throw new HttpCustomException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to update Plot!',
        });
      }

      return { success: true };
    } catch (error) {
      console.error(error);

      throw new HttpCustomException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to Update Plot!',
      });
    }
  }

  async deleteData(id: number): Promise<{ success: boolean }> {
    const plot = await this.plotRepository.findOneBy({ id });

    if (!plot) {
      throw new HttpCustomException({
        status: HttpStatus.NOT_FOUND,
        message: 'Plot not found!',
      });
    }

    try {
      const result = await this.plotRepository.softDelete(id);

      if (result.affected === 0) {
        throw new HttpCustomException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to delete Plot!',
        });
      }

      return { success: true };
    } catch (error) {
      console.error(error);

      throw new HttpCustomException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to Delete Plot!',
      });
    }
  }

  private async validateHectares(
    plot: Plot,
    rural_property_id: number,
  ): Promise<{ status: boolean; message?: string }> {
    const query = this.plotRepository.manager
      .createQueryBuilder(RuralProperty, 'rural_properties')
      .leftJoinAndSelect('rural_properties.plots', 'plots')
      .where('rural_properties.id = :rural_property_id', { rural_property_id });

    const rural_property = await query.getOne();

    if (!rural_property) {
      throw new HttpCustomException({
        status: HttpStatus.NOT_FOUND,
        message: 'Rural Property not found!',
      });
    }

    const plots = rural_property.plots;

    if (!plot.id) {
      plots.push(plot);
    } else {
      for (let i = 0; i < plots.length; i++) {
        if (plots[i].id === plot.id) {
          plots[i] = plot;
          break;
        }
      }
    }

    const total_hectares = plots.reduce((acc, plot) => acc + plot.hectares, 0);

    if (total_hectares > rural_property.hectares) {
      const message = 'Total hectares exceeds the rural property hectares!';
      console.info(message);
      return { status: false, message };
    }

    return { status: true };
  }
}
