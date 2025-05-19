<template>
  <div>
    <main>
      <div class="containerHome">
        <div class="content-text">
          <h1>
            Bem Vindo ao ambiente de <br />
            <span class="highlight">importação CSV</span> !
          </h1>
          <p>
            A space that unites conscious individuals who <br />
            collaborate to reduce their carbon footprint.
          </p>

          <!-- Indicadores do carrossel (bolinhas) -->
          <div class="carousel-indicators">
            <span v-for="(dot, index) in slides.length" :key="index" class="dot"
              :class="{ active: currentIndex === index }" @click="moveToSlide(index)"></span>
          </div>
        </div>

        <div class="contentImgHome">
          <!-- Carrossel de Imagens -->
          <div class="carousel">
            <div v-for="(slide, index) in slides" :key="index" class="carousel-item"
              :class="{ active: currentIndex === index }">
              <img :src="slide.src" :alt="slide.alt" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <form class="btnsHome" @submit.prevent="handleLogin">
        <div v-if="errorMessage" class="error" style="text-align: center; color: red;">
          {{ errorMessage }}
        </div>
        <input type="text" placeholder="Usuário" v-model="username" />
        <input type="password" placeholder="Senha" v-model="password" />
        <button type="submit" class="btn-principal">Login</button>
      </form>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      username: "",
      password: "",
      errorMessage: "",
      slides: [
        {
          src: 'https://via.placeholder.com/800x400/00FF00/FFFFFF?text=Imagem+2',
          alt: 'Imagem 1',
        },
        {
          src: 'https://via.placeholder.com/800x400/00FF00/FFFFFF?text=Imagem+2',
          alt: 'Imagem 2',
        },
        {
          src: 'https://via.placeholder.com/800x400/0000FF/FFFFFF?text=Imagem+3',
          alt: 'Imagem 3',
        },
        {
          src: 'https://via.placeholder.com/800x400/FFFF00/FFFFFF?text=Imagem+4',
          alt: 'Imagem 4',
        },
      ],
      database: [
        { username: "admin1", password: "pass1" },
        { username: "admin2", password: "pass2" },
        { username: "user1", password: "pass1" },
      ],
    };
  },
  methods: {
    moveToSlide(index) {
      this.currentIndex = index;
    },
    handleLogin() {
      const user = this.database.find(u => u.username === this.username);
      if (user && user.password === this.password) {
        this.errorMessage = "";
        this.$router.push('/periodo');
      } else {
        this.errorMessage = "Usuário ou senha inválidos.";
      }
    },
  },
};
</script>
