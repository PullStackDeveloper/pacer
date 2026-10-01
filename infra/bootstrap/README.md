# bootstrap

Applied **once**, manually, with local credentials (Phase 8):

- S3 bucket for Terraform state (versioned, encrypted, public access blocked)
- GitHub OIDC provider + deploy roles

Everything else is applied by CI.
