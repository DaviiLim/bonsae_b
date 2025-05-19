const PERFIS_VALIDOS = [
    'Coordenador(a)',
    'Professor(a)',
    'Aluno(a)',
    'Secretário(a)',
    'Estagiário(a)',
    'Advogado(a)'
];

    const FIELD_RULES = [
        {
            key: 'perfil',
            requiredMsg: 'Informe o perfil do usuário.',
            allowedValues: PERFIS_VALIDOS,
            allowedMsg: `O usuário deve se enquadrar em dos seguintes perfis: ${PERFIS_VALIDOS.join(', ')}.` 
        },
        {
            key: 'nome',
            requiredMsg: 'Informe o nome do usuário.'
        },
        {
            key: 'email',
            requiredMsg: 'Informe o E-mail.'
        },
        {
            key: 'senha',
            requiredMsg: 'Informe a senha'
        }
    ]

export function validateUsuarioCsv(records) {
    const errors = [];

    function addError(row, field, message) {
        errors.push({row, field, message})
    }

    records.forEach((row, idx) => {
        const rowNum = idx + 1;

        FIELD_RULES.forEach(rule => {
            const val = row[rule.key];

            if (!val || String(val).trim() === '') {
                addError(rowNum, rule.key, rule.requiredMsg);
                return;
            }

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