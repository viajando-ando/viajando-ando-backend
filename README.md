# Viajando Ando Backend :blue_car:

This project serve the information about travels

## You can view the documentation of swagger in the next URL or [live demo](https://viajando-ando-ykmiteeaiq-uc.a.run.app/):

#### `https://viajando-ando-ykmiteeaiq-uc.a.run.app/`

You can see a frontend connect with this backend, [it's here](https://viajando-ando.dflores.dev/)

#### The complete documentation [it's here](https://github.com/viajando-ando/documentation)

## Description :open_book:

The project use NodeJS with Typescript to write legible code. This backen was deployed in [Google Cloud Run](https://cloud.google.com/run?hl=es), building a image docker and pushed to [Google container registry](https://cloud.google.com/container-registry?hl=en), this combination create a big solution with high performance and scalability

### How to use the project?

- **Step 1**
  Run the next command in your terminal

#### `npm run install`

- **Step 2**
  run the project, this command run the code typescript

#### `npm run dev`

- **Build**
  If you want change the code, you must recompile (_only work in systems unix, because have a command rm -rf_). This command create a folder **build** with code in ES6.

#### `npm run build`

- **Build Docker image**

#### `docker build -t name_version:tag .`

#### `docker tag name_version:tag gcr.io/id_project_gcp/name_version_to_gcp:tag`

#### `docker push gcr.io/id_project_gcp/name_version_to_gcp:tag`

## Follow me [dflores.dev](https://dflores.dev)

### Anywhere @dfloresdev
