import { useDeployForm } from './useDeployForm'
import { usePrepDeploy } from './usePrepDeploy'

export const useDeploy = () => {
  const prepDeploy = usePrepDeploy()
  const deployForm = useDeployForm(prepDeploy)

  return {
    ...prepDeploy,
    ...deployForm,
  }
}
