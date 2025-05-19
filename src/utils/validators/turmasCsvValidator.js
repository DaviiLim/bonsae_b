/**
 * @typedef {Object} TurmaCsvRow
 * @property {string} disciplinaCodigo
 * @property {string} turno
 * @property {string} turma
 * @property {string} codigoDaTurma
 */

/**
 * Valida um array de registros de turma importados via CSV.
 *
 * @param {TurmaCsvRow[]} records
 * @returns {{ valid: boolean, errors: Array<{ row: number, field: string, message: string }>} }
 */
export function validateTurmaCsv(records) {
  // valores permitidos para o turno
  const TURNOS_VALIDOS = [
    'Matutino',
    'Vespertino',
    'Noturno'
  ];

  // regras de validação de cada campo
  const fieldRules = [
    {
      key: 'disciplinaCodigo',
      requiredMsg: 'Informe o código da disciplina.'
    },
    {
      key: 'turno',
      requiredMsg: 'Informe o turno da turma.',
      allowedValues: TURNOS_VALIDOS,
      allowedMsg: `Turno deve ser um dos seguintes: ${TURNOS_VALIDOS.join(', ')}.`
    },
    {
      key: 'turma',
      requiredMsg: 'Informe a identificação da turma.'
    },
    {
      key: 'codigoDaTurma',
      requiredMsg: 'Informe o código da turma.'
    }
  ];

  const errors = [];

  function addError(row, field, message) {
    errors.push({ row, field, message });
  }

  records.forEach((row, idx) => {
    const rowNum = idx + 1;

    // validação de campos obrigatórios e valores permitidos
    fieldRules.forEach(rule => {
      const val = row[rule.key];
      // obrigatório
      if (!val || String(val).trim() === '') {
        addError(rowNum, rule.key, rule.requiredMsg);
        return;
      }
      // valores permitidos (só turno, neste caso)
      if (rule.allowedValues && !rule.allowedValues.includes(val)) {
        addError(rowNum, rule.key, rule.allowedMsg);
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors
  };
}
