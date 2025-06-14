<script setup lang="ts">
import TopBar from '../components/TopBar.vue'
import SideBar from '../components/SideBar.vue'
import Button from '../components/button.vue'

import helpIcon from '../assets/circle-info-solid.svg'
import link from '../assets/link-solid.svg'
import Modal from '../components/modal.vue'
import { useProjectsStore } from '@/stores/projects';

import { ref } from 'vue';

const modalRef = ref();
const name = ref(''); // <-- Agrega esta línea

const abrirModal = () => {
  modalRef.value?.openModal();
};
</script>

<template>
  <div class="layout h-full">
    <main class="main h-full w-full flex flex-col">
      <TopBar />
      <div class="content h-full w-full flex flex-row">
        <SideBar />
        <div class="table ps-5">
          <router-view></router-view>
        </div>
      </div>
    </main>

    <Modal ref="modalRef">
      <template v-slot:title>
        <h1>Añadir Proyecto</h1>
      </template>
      <template v-slot:content>
        <form method="dialog" @submit="() => useProjectsStore().addProject(name)">
          <div class="form-control">
            <label for="project-name" class="label">
              <span class="label-text
                text-lg font-bold">Nombre del Proyecto</span>
            </label>
            <input
              type="text"
              id="project-name"
              class="input input-bordered w-full max-w-xs"
              placeholder="Nombre del Proyecto"
              v-model="name"
            >
          </div>
          <div class="modal-action">
            <button type="submit" class="btn btn-primary">Añadir</button>
          </div>
        </form>
      </template>
    </Modal>

    <Button lado="right" altura="bottom" @click="abrirModal">
      <img :src="helpIcon" alt="Help Icon">
    </Button>

    <Button lado="left" altura="bottom">
      <img :src="link" alt="">
    </Button>
  </div>
</template>