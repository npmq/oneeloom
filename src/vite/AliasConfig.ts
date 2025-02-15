import { resolve } from 'path'

interface AliasConfigEntry {
  find: string
  replacement: string
}

export const AliasConfig: AliasConfigEntry[] = [
  {
    find: '@config',
    replacement: resolve(__dirname, '../@config'),
  },
  {
    find: '@constants',
    replacement: resolve(__dirname, '../@constants'),
  },
  {
    find: '@contexts',
    replacement: resolve(__dirname, '../@contexts'),
  },
  {
    find: '@hooks',
    replacement: resolve(__dirname, '../@hooks'),
  },
  {
    find: '@redux',
    replacement: resolve(__dirname, '../@redux'),
  },
  {
    find: '@strategies',
    replacement: resolve(__dirname, '../@strategies'),
  },
  {
    find: '@typesdefs',
    replacement: resolve(__dirname, '../@types'),
  },
  {
    find: '@utils',
    replacement: resolve(__dirname, '../@utils'),
  },
  {
    find: '@states',
    replacement: resolve(__dirname, '../@xstate'),
  },
  {
    find: '@components',
    replacement: resolve(__dirname, '../components'),
  },
  {
    find: '@containers',
    replacement: resolve(__dirname, '../components/@containers'),
  },
  {
    find: '@atoms',
    replacement: resolve(__dirname, '../components/atoms'),
  },
  {
    find: '@molecules',
    replacement: resolve(__dirname, '../components/molecules'),
  },
  {
    find: '@organisms',
    replacement: resolve(__dirname, '../components/organisms'),
  },
  {
    find: '@layouts',
    replacement: resolve(__dirname, '../components/layouts'),
  },
  {
    find: '@templates',
    replacement: resolve(__dirname, '../components/templates'),
  },
  {
    find: '@icons',
    replacement: resolve(__dirname, '../components/atoms/icons'),
  },
  {
    find: '@base',
    replacement: resolve(__dirname, '../components/molecules/base'),
  },
  {
    find: '@pages',
    replacement: resolve(__dirname, '../pages'),
  },
  {
    find: '@styles',
    replacement: resolve(__dirname, '../styles'),
  },
]
