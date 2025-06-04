import { QueryRunner } from 'typeorm';
import { countDataTable, getData } from '../../utils/data';

export class PopulatePlots1749046211538 {
  public async up(
    queryRunner: QueryRunner,
    populate_factor: number,
  ): Promise<void> {
    const [count_rural_properties, count_plots] = await Promise.all([
      countDataTable(queryRunner, 'rural_properties'),
      countDataTable(queryRunner, 'plots'),
    ]);

    if (count_rural_properties <= 0 || count_plots > 0) {
      return;
    }

    const rural_properties = await getData(queryRunner, 'rural_properties');

    for (const i in rural_properties) {
      if (Object.prototype.hasOwnProperty.call(rural_properties, i)) {
        const rural_property = rural_properties[i];

        const data_plots = this.generateFakePlots(
          populate_factor,
          rural_property,
        );

        const query = [
          `INSERT INTO plots (rural_property_id, name, hectares) VALUES`,
          data_plots
            .map(
              (plot) =>
                `('${plot.rural_property_id}', '${plot.name}', '${plot.hectares}')`,
            )
            .join(','),
        ].join(' ');

        await queryRunner.query(query);
      }
    }
  }

  private generateFakePlots(
    populate_factor: number,
    rural_property: any,
  ): Array<any> {
    const plots_data = [];
    const plots_hectares = this.randDivisionHectares(
      Number(rural_property.hectares),
      populate_factor + 1,
    );
    for (let i = 0; i < populate_factor; i++) {
      plots_data.push({
        rural_property_id: rural_property.id,
        name: `Talhão ${i}`,
        hectares: plots_hectares[i].valorHectares,
      });
    }
    return plots_data;
  }

  private randDivisionHectares(hectaresTotal: number, numeroDeFatias: number) {
    if (
      typeof hectaresTotal !== 'number' ||
      isNaN(hectaresTotal) ||
      hectaresTotal < 0
    ) {
      throw new Error(
        "O 'hectaresTotal' deve ser um número float positivo ou zero.",
      );
    }
    if (
      typeof numeroDeFatias !== 'number' ||
      !Number.isInteger(numeroDeFatias) ||
      numeroDeFatias <= 0
    ) {
      throw new Error(
        "O 'numeroDeFatias' deve ser um número inteiro positivo.",
      );
    }
    if (hectaresTotal === 0) {
      return Array.from({ length: numeroDeFatias }, (_, i) => ({
        fatiaId: i + 1,
        valorHectares: 0,
        percentualDoTotal: 0,
      }));
    }
    if (numeroDeFatias === 1) {
      return [
        {
          fatiaId: 1,
          valorHectares: parseFloat(hectaresTotal.toFixed(4)),
          percentualDoTotal: 100,
        },
      ];
    }

    const pontosDeCorte = new Set();
    while (pontosDeCorte.size < numeroDeFatias - 1) {
      pontosDeCorte.add(Math.random() * hectaresTotal);
    }

    const pontosOrdenados = [
      0,
      ...Array.from(pontosDeCorte),
      hectaresTotal,
    ].sort((a: number, b: number) => {
      return a - b;
    });

    const resultados = [];
    let somaVerificacao = 0;

    for (let i = 0; i < pontosOrdenados.length - 1; i++) {
      let valorHectaresFatia =
        Number(pontosOrdenados[i + 1]) - Number(pontosOrdenados[i]);

      valorHectaresFatia = parseFloat(valorHectaresFatia.toFixed(4));

      if (i === pontosOrdenados.length - 2) {
        valorHectaresFatia = parseFloat(
          (hectaresTotal - somaVerificacao).toFixed(4),
        );
        if (valorHectaresFatia < 0) {
          valorHectaresFatia = 0;
        }
      }

      const percentualDoTotal = parseFloat(
        ((valorHectaresFatia / hectaresTotal) * 100).toFixed(4),
      );

      resultados.push({
        fatiaId: i + 1,
        valorHectares: valorHectaresFatia,
        percentualDoTotal: percentualDoTotal,
      });
      somaVerificacao += valorHectaresFatia;
    }

    const diferencaFinal = hectaresTotal - somaVerificacao;
    if (Math.abs(diferencaFinal) > 0.0001 && resultados.length > 0) {
      resultados[resultados.length - 1].valorHectares = parseFloat(
        (
          resultados[resultados.length - 1].valorHectares + diferencaFinal
        ).toFixed(4),
      );
      resultados[resultados.length - 1].percentualDoTotal = parseFloat(
        (
          (resultados[resultados.length - 1].valorHectares / hectaresTotal) *
          100
        ).toFixed(4),
      );
    }

    return resultados;
  }
}
