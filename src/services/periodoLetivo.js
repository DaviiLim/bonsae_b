import api from './api';

export function criarPeriodo(data) {
    return api.post('/periodos-letivos', data);
}