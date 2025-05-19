<template>
  <div class="containerUploader">
    <h1>Turmas</h1>
    <div class="content">
      <ul class="passos">
        <li>
          <h1 class="concluido">1</h1>
          <h3>Periodo letivo</h3>
        </li>
        <p><i class="arrow right"></i></p>
        <li>
          <h1 class="concluido">2</h1>
          <h3>Diciplina</h3>
        </li>
        <p><i class="arrow right"></i></p>
        <li>
          <h1 class="concluido">3</h1>
          <h3>Turmas</h3>
        </li>
        <p><i class="arrow right"></i></p>
        <li>
          <h1>4</h1>
          <h3>Usuarios</h3>
        </li>
        <p><i class="arrow right"></i></p>
        <li>
          <h1 class="">5</h1>
          <h3>Vinculos</h3>
        </li>
      </ul>
      <CsvUploader />
    </div>
    <button @click="goUsuarios">Proximo</button>
  </div>
</template>

<script>
import CsvUploader from '@/components/CsvUploader.vue';
export default {
  name: 'App',
  components: {
    CsvUploader,
  },
  methods: {
    goUsuarios() {
      this.$router.push('/usuarios');
    }
  }
}
</script>

<style scoped>
/* Container geral */
.containerUploader {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1.5rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

/* Título principal */
.containerUploader > h1 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
}

/* Área de conteúdo: progresso + uploader */
.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

/* Lista de passos (wizard) */
.passos {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
}
.passos li {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Círculo do passo */
.passos li h1 {
  width: 2rem;
  height: 2rem;
  margin: 0;
  line-height: 2rem;
  border-radius: 50%;
  background: #e0e0e0;
  color: #888;
  font-size: 1rem;
  transition: all 0.3s;
}

/* Passo concluído */
.passos li h1.concluido {
  background: var(--highlight-color);
  color: #fff;
}

/* Passo ativo (se quiser diferenciar do concluído) */
.passos li h1.active {
  background: #fff;
  border: 2px solid var(--highlight-color);
  color: var(--highlight-color);
}

/* Rótulo do passo */
.passos li h3 {
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
  text-align: center;
  color: #666;
}

/* Setas entre passos */
.passos p {
  margin: 0 0.75rem;
}
.arrow {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-right: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  transform: rotate(-45deg);
}

/* Botão de avançar */
button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-top: 1.5rem;
  background: var(--highlight-color);
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}
button:hover {
  background: #43a047;
}

/* Estilização do CsvUploader */
/* Aqui assumimos que dentro de CsvUploader há um wrapper com classe .uploader */
CsvUploader .uploader {
  width: 100%;
  padding: 2rem;
  border: 2px dashed #ccc;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
}
CsvUploader .uploader:hover {
  border-color: var(--highlight-color);
  background-color: #fafafa;
}
CsvUploader .uploader input[type="file"] {
  display: none;
}
CsvUploader .uploader p {
  margin: 0;
  font-size: 1rem;
  color: #666;
}

/* Você pode usar modificadores para estados como .dragover, .error, .success, etc. */
CsvUploader .uploader.dragover {
  border-color: #2196f3;
  background-color: #f0f8ff;
}
CsvUploader .uploader.error {
  border-color: #e53935;
  color: #e53935;
}
CsvUploader .uploader.success {
  border-color: var(--highlight-color);
  color: var(--highlight-color);
}
</style>