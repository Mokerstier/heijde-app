<template>
    <section class="container">
        <Header prefix="/" title="blogs" sub-title="Under construction"></Header>
    </section>
</template>
<script lang="ts" setup>
import { Octokit } from 'octokit';
const { GITHUB_TOKEN } = useRuntimeConfig();
const octokit = new Octokit({
    auth: GITHUB_TOKEN,
});

const blogs = await octokit.request('GET /repos/MokerStier/weekly-nerd-1920/wiki/');

console.log(blogs);
</script>
