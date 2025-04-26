'use server'

import { Locales } from '@/types/locales'
import { licenses } from '@/utils/licenses'

import { mit } from './mit'
import { gnuGplV3 } from './gnu-glp-v3'

export const getLicenseFileContent = async (
  license: (typeof licenses)[number]['value'],
) => {
  switch (license) {
    case 'mit':
      return mit
    case 'gnu-glp-v3':
      return gnuGplV3
    default:
      return ''
  }
}

export const getLicenseForReadme = async (
  license: (typeof licenses)[number]['value'],
  lang: Locales,
) => {
  const licenseName = licenses.find((l) => l.value === license)?.label

  if (!licenseName || licenseName === 'No License') {
    return ''
  }

  if (lang === 'en') {
    return `This project is licensed under the [${licenseName}](LICENSE.md) license. See the LICENSE file for details.`
  } else {
    return `Este projeto está licenciado sob a licença [${licenseName}](LICENSE.md). Ver o arquivo LICENSE para detalhes.`
  }
}
