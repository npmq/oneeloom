import { componentsDesktop, componentsMobile } from '@config/ComponentsConfig'
import { ComponentItems, LazyComponents } from '@typesdefs/components/types'
import { ComponentType, lazy } from 'react'
import { isMobile } from 'react-device-detect'

const componentsDevice = (): ComponentItems[] =>
  isMobile ? componentsMobile : componentsDesktop

const importModule = async (
  obj: ComponentItems,
): Promise<{
  default: ComponentType
}> => {
  try {
    const module = await obj.import()
    return {
      default: module[obj.name],
    }
  } catch (err) {
    console.error(`Failed to load module component ${obj.name}`, err)
    throw err
  }
}

const importComponents = (componentsList: ComponentItems[]): LazyComponents => {
  return componentsList.reduce<LazyComponents>((components, item) => {
    const dynamicImport = async () => await importModule(item)
    components[item.name] = lazy(dynamicImport)

    return components
  }, {} as LazyComponents)
}

export const importLazyComponents: LazyComponents =
  importComponents(componentsDevice())
