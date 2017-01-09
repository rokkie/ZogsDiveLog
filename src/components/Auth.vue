<template>
  <div>
    <button v-on:click="login">BAM</button>
  </div>
</template>

<style>
body {
  background-color:#ff0000;
}
</style>

<script>

export default{
  data () {
    return {
      msg:'hello vue'
    };
  },

  methods: {
    login: function () {
      this.$auth.login('foobar', 'asfsaf')
        .then(console.log);
    }
  }
};
</script>
