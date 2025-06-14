<script setup lang="ts">
import { useProjectsStore } from '@/stores/projects';
import { defineExpose } from 'vue';
import { ref } from 'vue';

const openModal = () => {
  const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
  if (modal) {
    modal.showModal();
  }
};

defineExpose({ openModal });

const input = document.getElementById('project-name') as HTMLInputElement;
const name = ref(input ? input.value : '');
</script>

<template>

  <dialog id="my_modal_1" class="modal" ref="modalRef">
    <div class="modal-box">
      <slot name="title" class="text-lg font-bold"></slot>
      <slot name="content" class="py-4">
        <div class="modal-action">
          <slot name="submit-button"></slot>
        </div>
      </slot>

    </div>
  </dialog>

</template>