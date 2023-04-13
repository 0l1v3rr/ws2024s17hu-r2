# WS2024 S17 R2 HU Test Project

## Test Project

The test project can be found here: [WS2024_HU_TP_S17_R2_EN_1_1.pdf](./WS2024_HU_TP_S17_R2_EN_1_1.pdf).

## Assets

You can find the necessary accessories in the repo below: [https://github.com/ws2024s17hu/ws2024s17hu-r2-assets](https://github.com/ws2024s17hu/ws2024s17hu-r2-assets)

---

## Setup

> **Warning**  
> Be aware that the `vendor` and the `node_modules` folders were not committed.

```sh
docker-compose up -d
```

---

## Submit

### 1. Backend:

- Laravel
- Source: `www/backend-laravel`
- Deploy: `www/backend-laravel`
- Base URL: http://backend.localhost/api/v1

### 2. Team Admin:

- React
- Source: `www/team-admin.src`
- Deploy: `www/team-admin`
- URL: http://team-admin.localhost

### 3. Runner App:

- React
- Source: `www/runner-app.src`
- Deploy: `www/runner-app`
- URL: http://runner-app.localhost
