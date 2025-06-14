<script setup lang="ts">

import { useRouter, useRoute} from 'vue-router';

const router = useRouter();
const handleHome = () => {
  router.push({ name: 'Home'});
};

</script>


 <template>

<nav class="navbar bg-base-100">
  <h1 @click="handleHome">Projects</h1>
</nav>

 </template>