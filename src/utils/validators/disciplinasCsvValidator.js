/**
 * @typedef {Object} DisciplinaCsvRow
 * @property {string} periodoLetivoIdentificacao
 * @property {string} disciplina
 * @property {string} codigoDaDisciplina
 * @property {string} dataInicial   // formato esperado: DD/MM/YYYY
 * @property {string} dataFinal     // formato esperado: DD/MM/YYYY
 * @property {string} categoria
 * @property {string} periodoCurricular
 * @property {string} estado
 * @property {string} campus
 */

/**
 * Valida um array de registros da disciplina importados via CSV.
 *
 * @param {DisciplinaCsvRow[]} records
 * @returns {{ valid: boolean, errors: Array<{ row: number, field: string, message: string }>} }
 */
export function validateDisciplinaCsv(records) {
  /** valores permitidos para categoria */
  const CATEGORIAS_VALIDAS = [
    'Curso',
    'NPJ',
    'Projetos Extensionistas',
    'TCC'
  ];

  /** regra de validação para cada campo */
  const fieldRules = [
    {
      key: 'periodoLetivoIdentificacao',
      requiredMsg: 'Informe a identificação do período letivo.'
    },
    {
      key: 'codigoDaDisciplina',
      requiredMsg: 'Informe o código da disciplina.'
    },
    {
      key: 'dataInicial',
      requiredMsg: 'Informe a data inicial da disciplina.',
      formatMsg: 'Data inicial deve estar no formato DD/MM/YYYY.',
      isDate: true
    },
    {
      key: 'dataFinal',
      requiredMsg: 'Informe a data final da disciplina.',
      formatMsg: 'Data final deve estar no formato DD/MM/YYYY.',
      isDate: true
    },
    {
      key: 'categoria',
      requiredMsg: 'Informe a categoria da disciplina.',
      allowedValues: CATEGORIAS_VALIDAS,
      allowedMsg: `Categoria deve ser uma das seguintes: ${CATEGORIAS_VALIDAS.join(', ')}.`
    }
  ];

  const errors = [];
  const DATE_REGEX = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  function addError(row, field, message) {
    errors.push({ row, field, message });
  }

  records.forEach((row, idx) => {
    const rowNum = idx + 1;

    // 1) valida campos obrigatórios, formato e valores permitidos
    fieldRules.forEach(rule => {
      const value = row[rule.key];

      // obrigatório
      if (!value || String(value).trim() === '') {
        addError(rowNum, rule.key, rule.requiredMsg);
        return; // pula validação adicional se vazio
      }

      // formato de data
      if (rule.isDate) {
        if (!DATE_REGEX.test(value)) {
          addError(rowNum, rule.key, rule.formatMsg);
        }
      }

      // valores permitidos (aplica só em categoria)
      if (rule.allowedValues) {
        if (!rule.allowedValues.includes(value)) {
          addError(rowNum, rule.key, rule.allowedMsg);
        }
      }
    });

    // 2) se ambas as datas existem e têm formato válido, compara-as
    const { dataInicial, dataFinal } = row;
    const mIni = DATE_REGEX.exec(dataInicial);
    const mFim = DATE_REGEX.exec(dataFinal);
    if (mIni && mFim) {
      const [ , dI, mI, yI ] = mIni.map(Number);
      const [ , dF, mF, yF ] = mFim.map(Number);
      const dateIni = new Date(yI, mI - 1, dI);
      const dateFim = new Date(yF, mF - 1, dF);

      if (dateFim < dateIni) {
        addError(rowNum, 'dataFinal', 'Data final não pode ser anterior à data inicial.');
        addError(rowNum, 'dataInicial', 'Data final não pode ser anterior à data inicial.');
      }
    }
  });

  return { valid: errors.length === 0, errors };
}
