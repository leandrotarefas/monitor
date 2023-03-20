<template>

  <nav class="navbar navbar-expand-sm bg-dark navbar-light">
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <h4 class="text-white-50">Monitor Anti Fraude</h4>
    </div>
  </nav>

    <ExtratoresProgressStatus />
    

</template>      

<script>


import ExtratoresProgressStatus from './components/ExtratoresProgressStatus.vue'

export default {
  name: 'App',
  components: {
    ExtratoresProgressStatus
  }
}
</script>


body {
  margin: 5rem;
}

