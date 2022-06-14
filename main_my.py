import github
import os
import logging
from decouple import config
from string import Template
from telegram import ParseMode

from telegram.ext import (
    Updater,
    CommandHandler,
    PollAnswerHandler,
    PollHandler,
    MessageHandler,
    Filters,
    CallbackContext,
    ConversationHandler
)

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)
logger = logging.getLogger(__name__)

def main() -> None:
    """Run bot."""
    # Create the Updater and pass it your bot's token.  
    updater = Updater(config("SERVER_BOT_TOKEN")) 
    HEAD_COMMIT_MESSAGE = config("HEAD_COMMIT_MESSAGE")
    HEAD_COMMIT_ACTOR = config("HEAD_COMMIT_ACTOR")
    Text =  f"""*Change Notify*\nStatus: {'Success ✅'}
            \nRepository: https://github.com/{'repository'}
            \nUser: {HEAD_COMMIT_ACTOR}
            \Commit: {HEAD_COMMIT_MESSAGE}"""
    data = {
        'author': HEAD_COMMIT_ACTOR,
        'message': HEAD_COMMIT_MESSAGE,
        'domain': config("DOMAIN"),
    }
    Text = Template(
        '''
        <b><i> 🎉 Server Update Notice 🎉</i></b>
        <b><i>$author</i></b> Just Updated $domain.
        Change-Notes: 
        _________________________
        - $message
        _________________________
        '''
    )
    updater.bot.send_message(chat_id=config("CHAT_ID"),text=Text.safe_substitute(data), parse_mode=ParseMode.HTML)
    print(':::::::::::::::::::::: 🎉 notification sent successfully 🎉 ::::::::::::::::::::::')

if __name__ == "__main__":
    main()
