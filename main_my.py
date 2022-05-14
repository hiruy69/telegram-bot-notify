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
    updater.bot.send_message(chat_id=config("CHAT_ID"),text="hello hiruy")
    print(':::::::::::::::::::::: ⏲️ notification sent successfully ⏲️ ::::::::::::::::::::::')
    print()

if __name__ == "__main__":
    main()