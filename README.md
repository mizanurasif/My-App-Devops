This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker & Kubernetes Cheatsheet

Run all commands from the project root (`my-app/`).

### 1. Build the Docker image

```bash
docker build -t my-app:2.0 .
```

Check it exists:

```bash
docker images
```

### 2. Run with Docker Compose

The compose file is `my-app.yaml` (not the default `docker-compose.yaml`), so pass it with `-f`:

```bash
docker compose -f my-app.yaml up -d      # start
docker compose -f my-app.yaml ps         # status
docker compose -f my-app.yaml logs -f    # logs
docker compose -f my-app.yaml down       # stop
```

- App: http://localhost:3000
- Mongo Express: http://localhost:8080

### 3. Run on Kubernetes (minikube)

**Load the image first.** minikube has its own image store, so a local build is invisible to it — skipping this gives `ImagePullBackOff`(optional):

```bash
minikube image load my-app:2.0
```

Apply every file in the folder at once:

```bash
kubectl apply -f ./kubernetes
```

Check everything is up:

```bash
kubectl get pods
kubectl get endpoints    # must show IPs, not <none>
```

Open in the browser:

```bash
minikube service my-app-service         # the app
minikube service mongo-express-service  # Mongo Express (login: admin / pass)
```

Keep that terminal open — it runs a tunnel and closing it kills the link.

> On Windows/Mac the Docker driver puts the node inside a VM, so `http://192.168.49.2:30100` will **not** open. Use `minikube service` (or `kubectl port-forward service/my-app-service 3000:3000`). On Linux the node IP works directly.

Tear down:

```bash
kubectl delete -f ./kubernetes
```

### Handy while debugging

```bash
kubectl describe pod <pod-name>    # why a pod won't start (image pull, config errors)
kubectl logs <pod-name>            # app output, only once the container has started
kubectl rollout restart deployment/my-app-deployment   # needed after a Secret/ConfigMap change
```
