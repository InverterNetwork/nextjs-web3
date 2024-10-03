import { useDeployForm } from './use-deploy-form'
import { usePrepDeploy } from './use-prep-deploy'

export const useDeploy = () => {
  const prepDeploy = usePrepDeploy()
  const deployForm = useDeployForm(prepDeploy)

  return {
    ...prepDeploy,
    ...deployForm,
  }
}
