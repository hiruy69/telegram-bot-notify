import github
import os
import logging
from decouple import config
# from telegram import (
#     Poll,
#     ParseMode,
#     KeyboardButton,
#     KeyboardButtonPollType,
#     ReplyKeyboardMarkup,
#     ReplyKeyboardRemove,
#     Update,
# )
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
    updater.bot.send_message(chat_id=config("CHAT_ID"),text=Text)
    print(':::::::::::::::::::::: 🎉 notification sent successfully 🎉 ::::::::::::::::::::::')

if __name__ == "__main__":
    main()