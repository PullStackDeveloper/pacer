# infra

Terraform for the Pacer platform on AWS. Lives in the same repository as the app
(see `docs/adr/`), but is not a Bun workspace.

| Path | Purpose |
|---|---|
| `bootstrap/` | state bucket + GitHub OIDC (applied once, manually) |
| `modules/` | reusable modules (network, postgres, ecs-service, static-site, queue, ...) |
| `envs/dev`, `envs/prod` | one root module and one state per environment |
| `policies/` | policy-as-code checks |

Contract with the app: outputs are published to SSM Parameter Store
(ECR URI, cluster/service names, site bucket, CloudFront id, queue URL).

Local checks (also run by the pre-commit hook and the `terraform` workflow):

```bash
cd infra
terraform fmt -check -recursive
tflint --init
tflint --recursive
```
