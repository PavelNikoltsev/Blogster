<template>
  <header>
    <div class="wrap">
      <RouterLink to="/">Blogster</RouterLink>
      <nav>
        <RouterLink to="/posts" class="dropdown">
          <div class="dropdown-name">Posts</div>
          <div class="dropdown-menu">
            <RouterLink to="/posts"> Overview </RouterLink>
            <RouterLink to="/categories"> Categories </RouterLink>
            <RouterLink to="/comments"> Comments </RouterLink>
          </div>
        </RouterLink>
        <RouterLink to="/pages">Pages</RouterLink>
        <RouterLink to="/settings" class="dropdown">
          <div class="dropdown-name"><i class="fa fas fa-cog"></i></div>
          <div class="dropdown-menu">
            <RouterLink to="/settings"> Setting </RouterLink>
            <RouterLink to="/users"> Users </RouterLink>
            <RouterLink to="/tags"> Tags </RouterLink>
            <RouterLink to="/settings/cron-jobs"> Cron jobs </RouterLink>
            <RouterLink to="/settings/logs">Logs </RouterLink>
          </div>
        </RouterLink>
        <RouterLink to="/profile" class="dropdown">
          <div class="dropdown-name"><i class="fa fas fa-user"></i></div>
          <div class="dropdown-menu">
            <RouterLink to="/profile"> Profile </RouterLink>
            <button>Sign out</button>
          </div>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style lang="postcss">
header {
  background-color: var(--c-bg-secondary);
  .wrap {
    display: flex;
    justify-content: space-between;
    gap: var(--s-5);
    align-items: stretch;
  }
  nav {
    display: flex;
    > a {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: var(--s-6);
      color: var(--c-text);
    }
  }
}
.dropdown {
  position: relative;
  &-menu {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    white-space: nowrap;
    background-color: var(--c-bg-secondary);
    min-width: 200px;
    > a {
      display: block;
      padding: var(--s-4);
    }
  }
  &:hover {
    .dropdown-menu {
      display: block;
    }
  }
}
</style>
