# Mancuso Lab

This repository contains the Mancuso Lab website, built from Markdown with Zensical.

## Preview locally

With uv and Python 3.11 or newer, run these commands from the repository root.

```sh
uv sync
uv run zensical serve
```

Open [the local preview](http://127.0.0.1:4242/). It reloads as you edit.

## Edit and build

Edit pages in `docs/` and add blog posts to `docs/blog/posts/`. Navigation and theme settings live in `zensical.toml`. The light and dark palettes are defined in `docs/stylesheets/extra.css`.

Run `uv run zensical build --clean` to generate the static site in `site/`.
