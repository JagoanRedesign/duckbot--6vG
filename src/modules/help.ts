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
          text: 'Admin',
          callback_data: 'menuadmin',
          hide: true,
        },
       {
        text: `Filter`,
        callback_data: 'menufilter',
        hide: true,
      },
      {
        text: `Note`,
        callback_data: 'menunote',
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
        parse_mode: 'HTML',
      }
    )
  } catch (error) {
    return reportError(error, ctx)
  }
}






export async function menuadmin(ctx) {
 
  try {
    
    let keyboard = [
      [
        {
          text: 'ᴋᴇᴍʙᴀʟɪ ➣',
          callback_data: 'helpmenu',
          hide: true,
        },
      ],
    ]
    
    
    return ctx.editMessageText(
      `<b>Admin</b>\nPerintah yang Tersedia:\n\n<code>/admincache</code> - menyegarkan cache dari daftar admin.\n<code>/settings</code> - dapatkan pengaturan grup saat ini`,
      {
        reply_markup: {
          inline_keyboard: keyboard,
        },
        parse_mode: 'HTML',
      }
    )
  } catch (error) {
    return reportError(error, ctx)
  }
}


export async function menufilter(ctx) {
 
  try {
    
    let keyboard = [
      [
        {
          text: 'ᴋᴇᴍʙᴀʟɪ ➣',
          callback_data: 'helpmenu',
          hide: true,
        },
      ],
    ]
    
    
    return ctx.editMessageText(
      `<b>Filter</b>\nPerintah yang Tersedia :\n\n<code>/filter</code> <b>{filterName} {filterValue}</b> - simpan catatan baru atau perbarui filter.\nUntuk <b>{filterValue}</b>bagian tersebut anda bisa menggantinya dengan membalas pesan.\n<code>/stop</code> <b>{filterName}</b> - hapus beberapa filter\n<code>/clearall</code> - hapus semua catatan\n<code>/filters </code>- dapatkan daftar semua filter`,
      {
        reply_markup: {
          inline_keyboard: keyboard,
        },
        parse_mode: 'HTML',
      }
    )
  } catch (error) {
    return reportError(error, ctx)
  }
}



export async function menunote(ctx) {
 
  try {
    
    let keyboard = [
      [
        {
          text: 'ᴋᴇᴍʙᴀʟɪ ➣',
          callback_data: 'helpmenu',
          hide: true,
        },
      ],
    ]
    
    
    return ctx.editMessageText(
      `<b>Notes</b>\nPerintah yang Tersedia :\n\n<code>/save</code> <b>{noteName} {noteValue}</b> - simpan catatan baru atau perbarui catatan.\nUntuk <b>{noteValue}</b>bagian tersebut anda bisa menggantinya dengan membalas pesan.\n<code>/clear</code> <b>{noteName}</b> - hapus beberapa catatan\n<code>/clearall</code> - hapus semua catatan\n<code>/notes</code> - dapatkan daftar semua catatan`,
      {
        reply_markup: {
          inline_keyboard: keyboard,
        },
        parse_mode: 'HTML',
      }
    )
  } catch (error) {
    return reportError(error, ctx)
  }
}
