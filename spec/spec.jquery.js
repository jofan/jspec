
describe 'jQuery'
  describe 'helpers'
    before
      .dom = this.sandbox()
    end

    it 'should add elements to a sandbox'
      .dom.prepend('<em>test</em>').should_have_text 'test'
    end

    it 'should retain visibility within a sandbox'
      .dom.children('em').hide().should_be_hidden
      .dom.children('em').show().should_be_visible
    end
  end
  
  describe 'async'
    it 'should load mah cookies (textfile)'
      $.post('async', function(text){
        text.should_eql 'cookies!'
      })
    end

    it 'should load mah cookies twice (ensure multiple async requests work)'
      $.post('async', function(text){
        text.should_eql 'cookies!'
      })
      $.post('async', function(text){
        text.should_not_eql 'rawr'
      })
    end 
  end
  
  describe 'matchers'
    before_each
      html = '<p><label><em>Save?</em></label>        \
      <select class="save" style="display: none;">    \
      <option value="0">No</option>                   \
      <option value="1">Yes</option>                  \
      </select>                                       \
      <strong>test</strong>                           \
      <strong>test</strong>                           \
      </p>'
      .elem = $(html)
    end

    it 'should fail with pretty print of element'
      .elem.should.not.have_tag 'label'
    end
    
    describe 'have_tag / have_one'
      it 'should check if a single child is present'
        .elem.should.have_tag 'label'
        .elem.should.have_tag 'em'
        .elem.should.have_one 'label'
        .elem.should.not.have_tag 'input'
      end
    end

    describe 'have_tags / have_many'
      it 'should check if more than one child is present'
        .elem.should.have_tags 'option'
        .elem.should.have_many 'option'
        .elem.should.not.have_many 'label'
      end
    end

    describe 'have_child'
      it 'should check if a direct child is present'
        .elem.should.have_child 'label'
        .elem.should.not.have_child 'em'
      end
    end

    describe 'have_children'
      it 'should check if more than one direct children are present'
        .elem.should.have_children 'strong'
        .elem.should.not.have_children 'select'
      end
    end
    
    describe 'have_text'
      it 'should check for plain text'
        .elem.children('label').should.have_text 'Save?'
      end
    end
    
    describe 'have_value'
      it 'should check if an element has the given value'
        .elem.find('option').get(1).should.have_value '1'  
      end
    end

    describe 'have_class'
      it 'should check if an element has the given class'
        .elem.children('select').should.have_class 'save'
      end
    end

    describe 'be_visible'
      it 'should check that an element is not hidden or set to display of none'
        .element('#jspec-report').should.be_visible
        '#jspec-report'.should.be_visible
        '<input style="visibility: hidden;"/>'.should.not.be_visible
        '<input style="display: none;"/>'.should.not.be_visible
        '<input />'.should.be_visible
      end
    end
    
    describe 'be_enabled'
      it 'should check that an element is currently enabled'
        '<input type="button"/>'.should.be_enabled
        '<input type="button" disabled="disabled" />'.should.not.be_enabled
      end
    end
    
    describe 'be_disabled'
      it 'should check that an element is currently disabled'
        '<input type="button"/>'.should.not.be_disabled
        '<input type="button" disabled="disabled" />'.should.be_disabled
      end
    end
    
    describe 'be_a_TYPE_input'
      it 'should check that an element is the given TYPE'
        '<input type="checkbox"/>'.should.be_a_checkbox_input
        '<input type="text"/>'.should.be_a_text_input
        '<input type="radio"/>'.should.be_a_radio_input
        '<input type="file"/>'.should.be_a_file_input
        '<input type="password"/>'.should.be_a_password_input
        '<input type="submit"/>'.should.be_a_submit_input
        '<input type="image"/>'.should.be_a_image_input
        '<input type="reset"/>'.should.be_a_reset_input
        '<input type="button"/>'.should.be_a_button_input
      end
    end
    
    describe 'be_hidden'
      it 'should check if an element is hidden'
        '<input style="display: none;" />'.should.be_hidden
        '<input style="visibility: hidden;" />'.should.be_hidden
        '<input />'.should.not.be_hidden
      end
    end

    describe 'have_attr'
      before_each 
        .elem = '<input type="button" title="some foo" value="Foo" />' 
      end
      
      it 'should check that an element has the given attribute'
        .elem.should.have_attr 'title'
        .elem.should.not_have_attr 'rawr'
      end
      
      it 'should check that the given attribute has a specific value'
        .elem.should.have_attr 'title', 'some foo'
        .elem.should.not.have_attr 'some', 'rawr'
        .elem.should.not.have_attr 'title', 'bar'
      end
    end
  end
  
end