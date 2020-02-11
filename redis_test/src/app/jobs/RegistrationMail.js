import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMail',
  async handle({ data }) {
    const { user } = data;
    await Mail.sendMail({
      from: 'Tiago Rodrigues <tiago@email.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'teste',
      html: `Olá, ${user.name}, bem-vindo ao sistema de filas`
    })
  }
}