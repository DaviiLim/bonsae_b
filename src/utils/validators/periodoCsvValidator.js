/**
 * @typedef {Object} PeriodoCsvRow
 * @property {string} periodoLetivo
 * @property {string} dataInicial   // formato esperado: DD/MM/YYYY
 * @property {string} dataFinal     // formato esperado: DD/MM/YYYY
 */

/**
 * Valida um array de registros de período letivo importados via CSV.
 *
 * @param {PeriodoCsvRow[]} records
 * @returns {{ valid: boolean, errors: Array<{ row: number, field: string, message: string }>}}
 */
export function validatePeriodoCsv(records) {
  /** regra de validação para cada campo */
  const fieldRules = [
    {
      key: 'periodoLetivo',
      requiredMsg: 'Informe qual é o período letivo.'
    },
    {
      key: 'dataInicial',
      requiredMsg: 'Informe a data inicial do período letivo.',
      formatMsg: 'Data inicial deve estar no formato DD/MM/YYYY.',
      isDate: true
    },
    {
      key: 'dataFinal',
      requiredMsg: 'Informe a data final do período letivo.',
      formatMsg: 'Data final deve estar no formato DD/MM/YYYY.',
      isDate: true
    }
  ];

  const errors = [];

  const DATE_REGEX = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  // fun­ção auxiliar para criar erros
  function addError(row, field, message) {
    errors.push({ row, field, message });
  }

  records.forEach((row, idx) => {
    const rowNum = idx + 1;

    // 1) valida campos obrigatórios e formato
    fieldRules.forEach(rule => {
      const value = row[rule.key];
      if (!value || String(value).trim() === '') {
        addError(rowNum, rule.key, rule.requiredMsg);
        return; // pula validação de formato se estiver vazio
      }

      if (rule.isDate) {
        const match = DATE_REGEX.exec(value);
        if (!match) {
          addError(rowNum, rule.key, rule.formatMsg);
        }
      }
    });

    // 2) se ambas as datas existem e têm formato válido, compara-as
    const { dataInicial, dataFinal } = row;
    if (dataInicial && dataFinal) {
      const mIni = DATE_REGEX.exec(dataInicial);
      const mFim = DATE_REGEX.exec(dataFinal);

      if (mIni && mFim) {
        // construindo objetos Date (meses em JS são base-0)
        const [ , dI, mI, yI ] = mIni.map(Number);
        const [ , dF, mF, yF ] = mFim.map(Number);

        const dateIni = new Date(yI, mI - 1, dI);
        const dateFim = new Date(yF, mF - 1, dF);

        if (dateFim < dateIni) {
          addError(rowNum, 'dataFinal', 'Data final não pode ser anterior à data inicial.');
          addError(rowNum, 'dataInicial', 'Data final não pode ser anterior à data inicial.')
        }
      }
    }
  });

  return { valid: errors.length === 0, errors };
}
