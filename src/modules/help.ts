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
      [
        {
          text: 'Purge',
          callback_data: 'menupurge',
          hide: true,
        },
       {
        text: `Report`,
        callback_data: 'menureport',
        hide: true,
      },
      {
        text: `Special`,
        callback_data: 'menuspecial',
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
          text: '⬅ ᴋᴇᴍʙᴀʟɪ',
          callback_data: 'helpmenu',
          hide: true,
        },
      ],
    ]
    
    
    return ctx.editMessageText(
      `Perintah yang Tersedia untuk <b>Admin</b>:\n\n<code>/admincache</code> - menyegarkan cache dari daftar admin.\n<code>/settings</code> - dapatkan pengaturan grup saat ini`,
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
          text: '⬅ ᴋᴇᴍʙᴀʟɪ',
          callback_data: 'helpmenu',
          hide: true,
        },
      ],
    ]
    
    
    return ctx.editMessageText(
      `Perintah yang Tersedia untuk <b>Filter</b>:\n\n<code>/filter</code> <b>{filterName} {filterValue}</b> - simpan catatan baru atau perbarui filter.\nUntuk <b>{filterValue}</b>bagian tersebut anda bisa menggantinya dengan membalas pesan.\n<code>/stop</code> <b>{filterName}</b> - hapus beberapa filter\n<code>/clearall</code> - hapus semua catatan\n<code>/filters </code>- dapatkan daftar semua filter`,
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
          text: '⬅ ᴋᴇᴍʙᴀʟɪ',
          callback_data: 'helpmenu',
          hide: true,
        },
      ],
    ]
    
    
    return ctx.editMessageText(
      `Perintah yang Tersedia untuk <b>Notes</b>:\n\n<code>/save</code> <b>{noteName} {noteValue}</b> - simpan catatan baru atau perbarui catatan.\nUntuk <b>{noteValue}</b>bagian tersebut anda bisa menggantinya dengan membalas pesan.\n<code>/clear</code> <b>{noteName}</b> - hapus beberapa catatan\n<code>/clearall</code> - hapus semua catatan\n<code>/notes</code> - dapatkan daftar semua catatan`,
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


export async function menupurge(ctx) {
 
  try {
    
    let keyboard = [
      [
        {
          text: '⬅ ᴋᴇᴍʙᴀʟɪ',
          callback_data: 'helpmenu',
          hide: true,
        },
      ],
    ]
    
    
    return ctx.editMessageText(
      `Perintah yang Tersedia untuk <b>Purge</b>:\n\n<code>/purge</code> - Hapus Pesan.\n<i>Balas pesan dengan <code>/purge</code>. Bot akan menghapus pesan mulai dari pesan yang anda balas hingga pesan <code>/purge</code> terkirim. Untuk grup, hanya grup admin yang dapat menggunakan ini!</i>`,
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


export async function menureport(ctx) {
 
  try {
    
    let keyboard = [
      [
        {
          text: '⬅ ᴋᴇᴍʙᴀʟɪ',
          callback_data: 'helpmenu',
          hide: true,
        },
      ],
    ]
    
    
    return ctx.editMessageText(
      `Perintah yang Tersedia untuk <b>Report</b>:\n\nUntuk melaporkan seseorang ke admin Anda dapat menggunakan perintah <code>/report</code> atau <code>@admin</code> atau <code>@admins</code> dengan pengguna yang membalas yang akan melaporkan.`,
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






export async function menuspecial(ctx) {
 
  try {
    
    let keyboard = [
      [
        {
          text: '⬅ ᴋᴇᴍʙᴀʟɪ',
          callback_data: 'helpmenu',
          hide: true,
        },
      ],
    ]
    
    
    return ctx.editMessageText(
      `Perintah yang Tersedia untuk <b>Special Features</b>:\n\n<code>/ocr</code> - ke ocr menggunakan api ruang ocr.\n<code>/ocrts</code> {lang} - ke ocr menggunakan Tesseract.js\n<i>Gunakan perintah di atas dengan membalas foto.</i>\n\n<code>/cal</code> - dapatkan kalkulator sederhana\n<code>/tts</code> {isoLang} - mengubah teks menjadi ucapan.\n<i>Balas teks pesan dengan perintah ini!</i>\n\n<code>/kang</code> {emoji}| <code>/curi</code> {emoji} - mencuri atau menjadikan gambar sebagai stiker.\n<i>Balas pesan stiker atau foto dengan perintah ini!</i>\n\n<code>/tr</code> {isoLang} - menerjemahkan teks.\n\n<b>For isoLang bot only support language :</b>\n<code>["af","sq","am","ar","hy","az","eu","be","bn","bs","bg","ca","ceb","ny","zh-cn","zh-tw","co","hr","cs","da","nl","en","eo","et","tl","fi","fr","fy","gl","ka","de","el","gu","ht","ha","haw","iw","hi","hmn","hu","is","ig","id","ga","it","ja","jw","kn","kk","km","ko","ku","ky","lo","la","lv","lt","lb","mk","mg","ms","ml","mt","mi","mr","mn","my","ne","no","ps","fa","pl","pt","pa","ro","ru","sm","gd","sr","st","sn","sd","si","sk","sl","so","es","su","sw","sv","tg","ta","te","th","tr","uk","ur","uz","vi","cy","xh","yi","yo","zu"]</code>\n\n<b>For Tesseract.js Lang bot only support language :</b>\n<code>["afr","amh","ara","asm","aze","aze_cyrl","bel","ben","bod","bos","bul","cat","ceb","ces","chi_sim","chi_tra","chr","cym","dan","deu","dzo","ell","eng","enm","epo","est","eus","fas","fin","fra","frk","frm","gle","glg","grc","guj","hat","heb","hin","hrv","hun","iku","ind","isl","ita","ita_old","jav","jpn","kan","kat","kat_old","kaz","khm","kir","kor","kur","lao","lat","lav","lit","mal","mar","mkd","mlt","msa","mya","nep","nld","nor","ori","pan","pol","por","pus","ron","rus","san","sin","slk","slv","spa","spa_old","sqi","srp","srp_latn","swa","swe","syr","tam","tel","tgk","tgl","tha","tir","tur","uig","ukr","urd","uzb","uzb_cyrl","vie","yid"]</code>`,
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
