'use server'

import { Locales } from '@/types/locales'
import { licenses } from '@/utils/licenses'

import fs from 'fs'

export const getLicenseFileContent = async (
  license: (typeof licenses)[number]['value'],
) => {
  const licenseFile = fs.readFileSync(
    `./src/services/licenses/${license}.md`,
    'utf8',
  )

  return licenseFile
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
