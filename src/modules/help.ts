import {
  replyToMessage,
  getPing,
  getLang,
  buildArray,
  getCurrentLang,
  isAdmin,
  reportError,
  parseBoolean,
} from './misc'
import groups from './database/groups'
import privates from './database/private'


export async function helpmenu(ctx) {
  let c = await getPing(ctx)
  try {
    let langs = await getLang(ctx)
    
    let keyboard = [
      [
        {
          text: 'admin',
          callback_data: 'menuadmin',
          hide: true,
        },
      ],
    ]
    
    
    return ctx.editMessageText(
      `Klik tombol di bawah ini untuk mendapatkan deskripsi tentang perintah spesifik.`,
      {
        reply_markup: {
          inline_keyboard: keyboard,
        },
      }
    )
  } catch (error) {
    return reportError(error, ctx)
  }
}






export async function menuadmin(ctx) {
  let c = await getPing(ctx)
  try {
    let langs = await getLang(ctx)
    
    let keyboard = [
      [
        {
          text: 'Kembali',
          callback_data: 'helpmenu',
          hide: true,
        },
      ],
    ]
    
    
    return ctx.editMessageText(
      `<b>Admin</b>\n\nPerintah yang Tersedia:\n<code>/admincache</code> - menyegarkan cache dari daftar admin.\n<code>/settings</code> - dapatkan pengaturan grup saat ini`,
      {
        reply_markup: {
          inline_keyboard: keyboard,
        },
      }
    )
  } catch (error) {
    return reportError(error, ctx)
  }
}

