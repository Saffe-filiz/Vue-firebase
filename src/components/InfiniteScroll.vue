<template>
	<div ref="trigger" class="trigger"></div>
</template>

<script>
	import '../assets/css/infiniteScroll.css'
	
	export default {
		name: 'Observer',

		data () {
			return {
				observer: null,
			}
		},

	    mounted () {
            this.observer = new IntersectionObserver(([entery]) => {
        		if(entery && entery.isIntersecting){
        			this.$emit('intersect')
        		}
        	});

        	this.observer.observe(this.$refs.trigger);
        },
       

	}
</script>

