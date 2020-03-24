<template>
    <section class="starred">
        <h2 class="title">Starred Words</h2>

        <div class="starred__inner">
            <Sidebar/>
            <SearchList/>
        </div>
    </section>
</template>

<script>
    import Sidebar from '@/components/sidebar/sidebar.vue'
    import SearchList from '@/components/search-list/search-list.vue'

    export default {
		name: "Starred",
        components: {
            Sidebar,
            SearchList
        }
	}
</script>

<style lang="scss">
    .starred {
        &__inner {
            display: flex;
            flex-flow: row nowrap;
            align-items: flex-start;
        }
    }

    .title {
        font-size: 42px;
        margin-bottom: 50px;
        padding-left: 20px;
        color: #464646;
    }
</style>