<template>
  <div>
    <div class="containerCsv" style="flex-direction: column;">
      <!-- Área de arrastar e soltar -->
      <div
        class="drop-area"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="handleDrop"
      >
        <p>Arraste seu arquivo CSV ou Excel aqui ou clique abaixo para selecionar</p>
        <input
          type="file"
          @change="handleFileUpload"
          accept=".csv,.CSV,.xlsx,.XLSX,.xls,.XLS"
        />
      </div>

      <!-- Exibição de erros gerais com scroll -->
      <div v-if="errors.length" class="errors">
        <ul>
          <li v-for="(err, i) in errors" :key="i">
            Linha {{ err.row }} • campo “{{ err.field }}”: {{ err.message }}
          </li>
        </ul>
      </div>

      <!-- Tabela com dados paginados -->
      <div class="tabela" v-if="paginatedData.length">
        <table>
          <thead>
            <tr>
              <th v-for="(header, index) in headers" :key="index">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex">
              <td
                v-for="(key, index) in keys"
                :key="index"
                :class="{ 'invalid-cell': getCellError(rowIndex, key) }"
                :title="getCellError(rowIndex, key)"
              >
                <template v-if="getCellError(rowIndex, key)">
                  <input
                    type="text"
                    v-model="row[key]"
                    @blur="onCellBlur"
                    @keyup.enter="onCellBlur"
                    class="edit-cell"
                  />
                </template>
                <template v-else>
                  {{ row[key] }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginação -->
      <div class="pagination" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>

        <!-- Botões numéricos -->
        <div class="page-numbers">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: currentPage === page }"
          >
            {{ page }}
          </button>
        </div>
      </div>

      <!-- Botão Enviar -->
      <div class="send-button" style="margin-top: 1rem; text-align: right;">
        <button
          @click="sendData"
          :disabled="errors.length > 0 || !data.length"
          class="btn btn-primary"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import api from '@/services/api'
import * as XLSX from 'xlsx'
import { validatePeriodoCsv }    from '@/utils/validators/periodoCsvValidator'
import { validateDisciplinaCsv } from '@/utils/validators/disciplinasCsvValidator'
import { validateTurmaCsv }      from '@/utils/validators/turmasCsvValidator'
import { validateUsuarioCsv }    from '@/utils/validators/usuariosCsvValidator'
import { validateVinculoCsv }    from '@/utils/validators/vinculosCsvValidator'

// Dados e estado reativos
const data = ref([])
const headers = ref([])
const keys = ref([])
const errors = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const currentType = ref('') // tipo de planilha: usuario, disciplina, etc.

// Validador atual (setado após upload)
let currentValidator = validatePeriodoCsv

// Computed para paginação
const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage.value))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return data.value.slice(start, start + itemsPerPage.value)
})

// Funções de navegação de página
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Normaliza cabeçalhos para chaves
function normalizeHeader(texto) {
  if (typeof texto !== 'string') return ''
  const textoSemAcento = texto.normalize('NFD').replace(/[̀-\u036f]/g, '')
  const textoSemEspacos = textoSemAcento.replace(/[^a-zA-Z0-9]+/g, ' ')
  const palavras = textoSemEspacos.trim().split(' ')
  if (!palavras.length) return ''
  let camelCase = palavras[0].toLowerCase()
  for (let i = 1; i < palavras.length; i++) {
    const p = palavras[i]
    camelCase += p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
  }
  return camelCase.replace(/ç/g, 'c')
}

function toIsoDate(brDate) {
  if (!brDate || typeof brDate !== 'string') return brDate;
  const [dia, mes, ano] = brDate.split('/');
  if (!dia || !mes || !ano) return brDate;
  return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

// Parsing de CSV para array de objetos
function parseCSV(text) {
  const lines = text.trim().split('\n')
  const raw = lines[0].split(/[,;]/).map(h => h.trim())
  const normalized = raw.map(normalizeHeader)

  headers.value = raw
  keys.value = normalized
  data.value = lines.slice(1).map(line => {
    const values = line.split(/[,;]/).map(v => v.trim())
    const row = {}
    normalized.forEach((key, idx) => {
      row[key] = values[idx] ?? ''
    })
    return row
  })
  currentPage.value = 1
}

// Obtém mensagem de erro para célula
function getCellError(rowIndex, key) {
  const absoluteIndex = (currentPage.value - 1) * itemsPerPage.value + rowIndex
  const err = errors.value.find(e => e.row - 1 === absoluteIndex && e.field === key)
  return err ? err.message : ''
}

// Ao editar e sair do input, revalida todo o dataset
function onCellBlur() {
  const { valid, errors: errs } = currentValidator(data.value)
  errors.value = valid ? [] : errs
}


// Função para enviar dados corr
async function sendData() {
  // Revalida antes de enviar
  const { valid, errors: errs } = currentValidator(data.value)
  if (!valid) {
    errors.value = errs
    return
  }

  // Bota datas para formato ISO
  data.value.forEach((item) => {
    item.dataInicial = toIsoDate(item.dataInicial);
    item.dataFinal = toIsoDate(item.dataFinal);
  })

  try {
    console.log(data.value[0].valid)

    const payload = {
      type: currentType.value,
      data: data.value
    }
    await api.post('/csv-upload', payload)
    alert('Dados enviados com sucesso!')
    // Opcional: resetar estado
    data.value = []
    headers.value = []
    keys.value = []
    currentPage.value = 1
    currentType.value = ''
  } catch (err) {
    console.error(err)
    alert('Erro ao enviar dados: ' + err.message)
  }
}

// Lógica de leitura de arquivo (CSV/XLSX)
function handleFile(file) {
  const nome = file.name.toLowerCase()
  const ext = nome.split('.').pop()
  const reader = new FileReader()

  reader.onload = (e) => {
    let csvText = e.target.result

    if (['xlsx', 'xls'].includes(ext)) {
      const dataArray = new Uint8Array(csvText)
      const workbook = XLSX.read(dataArray, { type: 'array' })
      csvText = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]])
    }

    parseCSV(csvText)

    // Define type e validador
    if (nome.includes('usuario')) {
      currentType.value = 'usuario'
      currentValidator = validateUsuarioCsv
    } else if (nome.includes('disciplina')) {
      currentType.value = 'disciplina'
      currentValidator = validateDisciplinaCsv
    } else if (nome.includes('turma')) {
      currentType.value = 'turma'
      currentValidator = validateTurmaCsv
    } else if (nome.includes('periodo')){
      currentType.value = 'periodo'
      currentValidator = validatePeriodoCsv
    } else {
      currentType.value = 'vinculo'
      currentValidator = validateVinculoCsv
    }

    const { valid, errors: errs } = currentValidator(data.value)
    errors.value = valid ? [] : errs
  }

  if (ext === 'csv') {
    reader.readAsText(file)
  } else if (['xlsx', 'xls'].includes(ext)) {
    reader.readAsArrayBuffer(file)
  } else {
    errors.value = [{ row: null, field: null, message: 'Formato de arquivo não suportado' }]
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file && /\.(csv|xlsx|xls)$/i.test(file.name)) {
    handleFile(file)
  }
}

function handleDrop(event) {
  const file = event.dataTransfer.files[0]
  if (file && /\.(csv|xlsx|xls)$/i.test(file.name)) {
    handleFile(file)
  }
}
</script>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.5s;
}
.btn:hover {
  background-color: #4caf50;
}
.btn-primary {
  background-color: #DDEB9D;
  color: #fff;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Área de drop */
.drop-area {
  padding: 1.5rem;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s, background 0.3s;
}
.drop-area:hover {
  border-color: #4caf50;
  background: #fafafa;
}

/* Erros modernizados */
.errors {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 1.25rem 0;
  padding: 1rem;
  background: #fff5f5;
  border-left: 4px solid #e57373;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  color: #b71c1c;
  font-size: 0.95rem;
  line-height: 1.4;
  overflow-y: auto;
  max-height: 200px;
}

/* Ícone de erro */
.errors::before {
  content: "⚠️";
  flex-shrink: 0;
  font-size: 1.25rem;
  line-height: 1;
  margin-top: 0.1rem;
}

/* Lista interna de mensagens */
.errors ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.errors li {
  margin-bottom: 0.5rem;
}
.errors li:last-child {
  margin-bottom: 0;
}
/* Wrapper da tabela */
.tabela {
  margin-top: 1rem;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

/* Tabela */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #ffffff;
}

/* Cabeçalho */
th {
  position: sticky;
  top: 0;
  background: #fafafa;
  color: #555;
  font-weight: 600;
  padding: 0.75rem;
  text-align: left;
  border-bottom: 2px solid #e0e0e0;
}

/* Células */
td {
  padding: 0.75rem;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

/* Zebra stripes sutis */
tr:nth-child(even) td {
  background: #fcfcfc;
}

/* Hover da linha */
tr:hover td {
  background: #f5f5f5;
}

/* Células inválidas */
.invalid-cell {
  background-color: #fff5f5 !important;
  position: relative;
}
.invalid-cell::after {
  content: attr(data-error);
  position: absolute;
  bottom: 100%;
  left: 0;
  padding: 0.25rem 0.5rem;
  
  color: #fff;
  font-size: 0.75rem;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.invalid-cell:hover::after {
  opacity: 1;
}

/* Input de edição */
.edit-cell {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
.edit-cell:focus {
  outline: none;
  border-color: #4caf50;
}
.invalid-cell .edit-cell {
  border-color: #e57373;
}

/* Paginação */
.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
}

/* Botões de paginação */
.pagination button {
  background: none;
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
  background-color: #DDEB9D;
}
.pagination button:hover:not(:disabled) {
  background: #f0f0f0;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Números de página */
.page-numbers {
  display: flex;
  gap: 0.5rem;
}
.page-numbers button.active {
  font-weight: 600;
  text-decoration: underline;
}
</style>