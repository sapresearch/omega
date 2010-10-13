class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :item, :polymorphic => true

  scope :of, lambda { |user| where('user_id = ?', user) }
  scope :klassed, lambda { |klass| where('item_type = ?', klass)}
  scope :for, lambda { |model| where('item_id = ?', model).klassed(model.class) }

  validates :item_id, :uniqueness => { :scope => [:user_id, :item_id, :item_type] }

  module Paths
    PATHS = {}

    class << self
      def [](klass)
        PATHS[_normalie_klass(klass)]
      end

      def []=(klass, url_helper)
        PATHS[_normalie_klass(klass)] = url_helper
      end

      private
        def _normalie_klass(klass)
          case klass
            when String
              klass
            when Symbol, Class
              klass.to_s
            when Object
              klass.class.to_s
            else
              raise(ArgumentError, 'klass must String, Symbol, Class or Object')
          end
        end
    end
  end
end
