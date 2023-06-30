import {
  replyToMessage,
  getPing,
  getLang,
  buildArray,
  getCurrentLang,
  isAdmin,
  reportError,
} from './misc';
import {client} from '../';
import {Api} from 'telegram';
import fetch from 'node-fetch';
import groups from './database/groups';
import privates from './database/private';

export async function start(ctx) {
  const c = await getPing(ctx);
  const langs = await getLang(ctx);
  const first_name = ctx.from.first_name;
  const last_name = ctx.from.last_name || '';
  const mention = `<a href="tg://user?id=${ctx.from.id}">${first_name} ${last_name}</a>`.trim();
  const keyboard = [
    [
      {
        text: `➕ ${langs.addGroup} ➕`,
        url: `https://t.me/${ctx.botInfo.username}?startgroup=settings`,
        hide: true,
      },
    ],
    [
      {
        text: `👨🏻‍🔧 ${langs.support}`,
        url: `https://t.me/DutabotID`,
        hide: true,
      },
      {
        text: `📖 ${langs.docsButton}`,
        url: 'https://duckbot.vercel.app',
        hide: true,
      },
    ],
[
      {
        text: `${langs.donate}`,
        callback_data: 'donate',
        hide: true,
      },
    ],

    [
      {
        text: `🌐 ${langs.btnSetlang}`,
        callback_data: 'setlang',
        hide: true,
      },
    ],
  ];
  if (ctx.chat.type !== 'private') {
    return replyToMessage(
        ctx,
        `${langs.pmMessage}\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`,
        [
          [
            {
              text: langs.pmButton,
              url: `https://t.me/${ctx.botInfo.username}?start`,
            },
          ],
        ],
    );
  }
  return replyToMessage(
      ctx,
      `${langs.start.replace(
          /\{mention\}/i,
          mention,
      )}\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`,
      keyboard,
  );
}
export async function ping(ctx) {
  const c = await getPing(ctx);
  const text = `<b>PONG ✨</b>\n<b>Time Taken:</b> <code>${c}</code>\n<b>Service Uptime:</b> <code>${await getPing(ctx)}</code>`;
  return replyToMessage(ctx, text, false);
}
export async function setLang(ctx) {
  const langs = await getLang(ctx);
  const c = await getPing(ctx);
  try {
    if (ctx.chat.type !== 'private') {
      if (!(await isAdmin(ctx))) {
        return replyToMessage(ctx, langs.userNonAdmin, false);
      }
    }
    const data = ['en', 'id'];
    const textData = ['🇬🇧 English', '🇮🇩 Indonesia'];
    const button = new Array();
    const currentLang = await getCurrentLang(ctx);
    for (let i = 0; i < data.length; i++) {
      const key = data[i];
      const json = {
        text: textData[i],
        callback_data: `setlang ${key}`,
        hide: true,
      };
      button.push(json);
    }
    const keyboard = await buildArray(button, 2);
    return replyToMessage(
        ctx,
        `${langs.langAvalible.replace(
            /\{lang\}/i,
            currentLang,
        )}\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`,
        keyboard,
    );
  } catch (error) {
    replyToMessage(
        ctx,
        `${langs.getLangError}\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`,
        false,
    );
    return reportError(error, ctx);
  }
}

export async function cal(ctx) {
  try {
    const keyboard = [
      [
        {
          text: 'Del',
          callback_data: 'cal del',
          hide: true,
        },
        {
          text: 'Clear',
          callback_data: 'cal clear',
          hide: true,
        },
      ],
      [
        {
          text: '(',
          callback_data: 'cal add (',
          hide: true,
        },
        {
          text: ')',
          callback_data: 'cal add )',
          hide: true,
        },
      ],
      [
        {
          text: '7',
          callback_data: 'cal add 7',
          hide: true,
        },
        {
          text: '8',
          callback_data: 'cal add 8',
          hide: true,
        },
        {
          text: '9',
          callback_data: 'cal add 9',
          hide: true,
        },
        {
          text: '÷',
          callback_data: 'cal add ÷',
          hide: true,
        },
      ],
      [
        {
          text: '4',
          callback_data: 'cal add 4',
          hide: true,
        },
        {
          text: '5',
          callback_data: 'cal add 5',
          hide: true,
        },
        {
          text: '6',
          callback_data: 'cal add 6',
          hide: true,
        },
        {
          text: '×',
          callback_data: 'cal add ×',
          hide: true,
        },
      ],
      [
        {
          text: '1',
          callback_data: 'cal add 1',
          hide: true,
        },
        {
          text: '2',
          callback_data: 'cal add 2',
          hide: true,
        },
        {
          text: '3',
          callback_data: 'cal add 3',
          hide: true,
        },
        {
          text: '-',
          callback_data: 'cal add -',
          hide: true,
        },
      ],
      [
        {
          text: '.',
          callback_data: 'cal add .',
          hide: true,
        },
        {
          text: '0',
          callback_data: 'cal add 0',
          hide: true,
        },
        {
          text: '=',
          callback_data: 'cal sum',
          hide: true,
        },
        {
          text: '+',
          callback_data: 'cal add +',
          hide: true,
        },
      ],
    ];
    return replyToMessage(
        ctx,
        '...This is a simple calculator that you can use to calculate...',
        keyboard,
    );
  } catch (error) {
    return reportError(error, ctx);
  }
}

export async function all(ctx) {
  const langs = await getLang(ctx);
  const c = await getPing(ctx);
  try {
    const msg = await replyToMessage(
        ctx,
        `PERINGATAN! Saya mungkin akan melakukan spam untuk menyebutkan semua anggota di grup ini.\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(
            ctx,
        )}</code>`,
    );
    // let mention = ""
    const count = await ctx.getChatMembersCount();
    const result = await client.getParticipants(ctx.chat.id, {
      limit: count,
    });
    const arr = new Array();
    for (let i = 0; i < result.length; i++) {
      if (!result[i].bot) {
        arr.push(result[i]);
      }
    }
    const final = await buildArray(arr, 5);
    for (let i = 0; i < final.length; i++) {
      const d = final[i];
      let mention = '';
      for (let e = 0; e < d.length; e++) {
        const f = d[e];
        if (f.username) {
          mention += `@${f.username} `;
        } else {
          mention += `<a href="tg://user?id=${f.id}">${f.firstName}</a> `;
        }
      }
      ctx.replyWithHTML(
          `<b>Hai Semua Anggota!</b>\n\n${mention}\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(
              ctx,
          )}</code>`,
          {
            reply_to_message_id: msg.message_id,
          },
      );
    }
    // return ctx.replyWithHTML(`${text}\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>${mention}`)
  } catch (error) {
    return reportError(error, ctx);
  }
}
export async function see(ctx) {
  const c = await getPing(ctx);
  try {
    const data = await groups.find();
    if (ctx.chat.type === 'private') {
      const pData = await privates.findOne({chat_id: ctx.from.id});
      let text = `<b>UserInfo</b>\nName : ${ctx.from.first_name} ${
        ctx.from.last_name ? ctx.from.last_name : ''
      }\nId : <code>${ctx.from.id}</code>`;
      const msg = await replyToMessage(
          ctx,
          `${text}\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`,
      );
      let join: any = 0;
      let connected: any = 0;
      let warn: any = 0;
      if (data !== null) {
        for (let i = 0; i < data.length; i++) {
          const users = data[i].users;
          for (let j = 0; j < users.length; j++) {
            if (users[j].id == ctx.from.id) {
              join = join + 1;
            }
          }
        }
      }
      if (pData !== null) {
        connected = pData.connected;
        warn = pData.warns.length;
      }
      text += `\nConnected Chat : <code>${connected}</code>\nWarn in All Group: <code>${warn}</code>\nQya Mata : <a href="https://duckbot.vercel.app/tools/duckbotmata?id=${
        ctx.from.id
      }">View On Website</a>\nSee on <code>${join}</code> Groups.\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(
          ctx,
      )}</code>`;
      return ctx.telegram.editMessageText(msg.chat.id, msg.message_id, undefined, text, {
        parse_mode: 'HTML',
      });
    }

    if (ctx.message.reply_to_message) {
      const pData = await privates.findOne({chat_id: ctx.message.reply_to_message.from.id});
      let text = `<b>UserInfo</b>\nName : ${ctx.message.reply_to_message.from.first_name} ${
        ctx.message.reply_to_message.from.last_name ?
          ctx.message.reply_to_message.from.last_name :
          ''
      }\nId : <code>${ctx.message.reply_to_message.from.id}</code>\nChat Id : <code>${
        ctx.chat.id
      }</code>`;
      const msg = await replyToMessage(
          ctx,
          `${text}\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`,
      );
      let join: any = 0;
      let connected: any = 0;
      let warn: any = 0;
      if (data !== null) {
        for (let i = 0; i < data.length; i++) {
          const users = data[i].users;
          for (let j = 0; j < users.length; j++) {
            if (users[j].id == ctx.message.reply_to_message.from.id) {
              join = join + 1;
            }
          }
        }
      }
      if (pData !== null) {
        connected = pData.connected;
        warn = pData.warns?.length;
      }
      text += `\nConnected Chat : <code>${connected}</code>\nWarn in All Group: <code>${warn}</code>\nQya Mata : <a href="https://duckbot.vercel.app/tools/duckbotmata?id=${
        ctx.message.reply_to_message.from.id
      }">View On Website</a>\nSee on <code>${join}</code> Groups.\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(
          ctx,
      )}</code>`;
      return ctx.telegram.editMessageText(msg.chat.id, msg.message_id, undefined, text, {
        parse_mode: 'HTML',
      });
    }

    const pData = await privates.findOne({chat_id: ctx.from.id});
    let text = `<b>UserInfo</b>\nName : ${ctx.from.first_name} ${
      ctx.from.last_name ? ctx.from.last_name : ''
    }\nId : <code>${ctx.from.id}</code>\nChat Id : <code>${ctx.chat.id}</code>`;
    const msg = await replyToMessage(
        ctx,
        `${text}\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`,
    );
    let join: any = 0;
    let connected: any = 0;
    let warn: any = 0;
    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        const users = data[i].users;
        for (let j = 0; j < users.length; j++) {
          if (users[j].id == ctx.from.id) {
            join = join + 1;
          }
        }
      }
    }
    if (pData !== null) {
      connected = pData.connected;
      warn = pData.warns?.length;
    }
    text += `\nConnected Chat : <code>${connected}</code>\nWarn in All Group: <code>${warn}</code>\nQya Mata : <a href="https://duckbot.vercel.app/tools/duckbotmata?id=${
      ctx.from.id
    }">View On Website</a>\nSee on <code>${join}</code> Groups.\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(
        ctx,
    )}</code>`;
    return ctx.telegram.editMessageText(msg.chat.id, msg.message_id, undefined, text, {
      parse_mode: 'HTML',
    });
  } catch (error) {
    return reportError(error, ctx);
  }
}


export async function kick(ctx) {
  const c = await getPing(ctx);

 
    if (ctx.chat.type === 'private') {
    
    await replyToMessage(
          ctx,
          `Fitur ini dibuat untuk grup !\n\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`,
      );
    } else {
    let replyMsg = ctx.message.reply_to_message
    const { status } = await ctx.telegram.getChatMember(ctx.from.id)
   if (!['administrator', 'creator'].includes(status)) {
    return ctx.replyWithHTML(`<b>Kamu harus jadi admin atau owner grup untuk melakukan tindakan ini.</b>\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`)
    }
    
    ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);  
   
    if (replyMsg) { 
          
     try {
     ctx.telegram.kickChatMember(ctx.chat.id, replyMsg.from.id);
      ctx.telegram.unbanChatMember(ctx.chat.id, replyMsg.from.id);
        } catch (error) {
       return ctx.replyWithHTML(`ℹ️ <b>Can\'t ban other admins.</b>\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`)
   
    return reportError(error, ctx);
  }
      return ctx.replyWithHTML(`Berhasil menendang <b>${replyMsg.from.first_name} ${replyMsg.from.last_name ? replyMsg.from.last_name : ''}</b>\n\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`)

} else {
       return ctx.replyWithHTML(`❓ <b>User unknown.</b>\nPlease Reply message, then try again.\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`)
       }
    
    }
    
    
  
}
