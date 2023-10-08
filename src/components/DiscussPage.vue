<template>
    <section class='comments' aria-labelledby="comment">
      <h2 id="comment">Let the others know your opinion!</h2>
      <Disqus shortname='dramatic-searchfilm' />
    </section>
  </template>
  
  
<script>
import { Disqus } from 'vue-disqus'

export default {
  name: 'PostPage',
  components: {
    Disqus
  }
}
</script>

<style>
    .comments {
        margin-right: 50px;
        margin-left: 50px;
    }
</style>
  
   