#!/bin/bash

# Cria as pastas
mkdir -p src/components
mkdir -p src/views
mkdir -p src/store
mkdir -p src/services

# Cria arquivos de componentes
touch src/components/CsvUploader.vue
touch src/components/DataTable.vue
touch src/components/StepNavigation.vue
touch src/components/Stepper.vue

# Cria arquivos de views
touch src/views/PeriodoView.vue
touch src/views/DisciplinasView.vue
touch src/views/TurmasView.vue
touch src/views/UsuariosView.vue
touch src/views/VinculosView.vue

# Cria arquivos de store e services
touch src/store/importData.js
touch src/services/api.js

# Garante que o App.vue existe (caso não tenha sido criado)
touch src/App.vue

echo "✔️ Estrutura criada com sucesso!"
